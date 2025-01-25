import { Material, NokDismantleMaterials, NokRework, Recipe, RecipeBoms, RwDismantledMaterials, Station, WorkShift } from '../../../models';
import { ClaimStatus, DismantledMaterialData, ProductStatus, ReworkStatus } from '../types';
import { reworkDataProcessor } from '../utils/nokDataProcessor';
import nokDetects from './nokDetects';

// Define Rework query 
const query = {
  attributes: { exclude: [] },
  include: [
    {
      model: NokDismantleMaterials,
      attributes: { exclude: [] },
      include: [
        {
          model: Material,
          as: 'material',
          attributes: ['id', 'itemShortName', 'itemLongName', 'itemCode', 'price', 'unit', 'traceable', 'active'],
        },
        {
          model: RwDismantledMaterials,
          as: 'rwDismantledMaterial',
          attributes: { exclude: ['id', 'reworkId', 'recipeBomId'] },
        },
        {
          model: RecipeBoms,
          as: 'recipeBom',
          attributes: { exclude: ['id', 'recipeId', 'materialId'] },
          include: [
            {
              model: Recipe,
              as: 'recipe',
              attributes: ['id', 'recipeCode', 'description', 'recipeType'],
            },
          ],
        }
      ],
      },
      {
        model: WorkShift,
        as: 'reworkShift'
      },
      {
        model: Recipe
      },
      {
        model: Station,
        as: 'reworkStation'
      },
    ]
};

// Get all Reworks
const getAllReworks = async(): Promise<NokRework[]> => {
  try {
    const reworks = await NokRework.findAll();
    console.log('reworks -> ', reworks);

    return reworks;
  } catch (err : unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    console.log('**** error :', errorMessage);
    throw new Error(errorMessage);
  }
};

// Get a Rework based on ID
const getRework = async(id: number): Promise<NokRework> => {
  const rework = await NokRework.findByPk(id);
  console.log('rework by id -> ', rework);
  
 
  if (!rework) {
    throw new Error ('the rework not found');
  }
  return rework;
};

// Get Reworks by Nok ID
const getReworksByNok = async (nokId: number): Promise<NokRework> => {
  try {
    const reworks = await NokRework.findAll({
      where: { nokId },
      attributes: query.attributes,
      include: query.include,
    });


    console.log(' rework by product ->', reworks);
    const result = reworks[0]
    return result;
    
  } catch (err : unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    console.log('**** error :', errorMessage);
    throw new Error(errorMessage);
  }
}


// Create a new Rework
const createRework = async (reworkData: unknown): Promise<NokRework> => {
  console.log('** NOK * rework ->Raw Rework Data', reworkData);

  // test data
  const newReworkData = await reworkDataProcessor(reworkData);

  console.log('** * rework -> newReworkData', newReworkData);

  try {
    const [rework] = await NokRework.upsert(newReworkData)
    console.log('** * rework -> create', rework);
    if(!rework) {
      throw new Error('Rework not Saved - Call Administrator!');
    }
    // Update Nok Data
    const nok = await nokDetects.getNokDetect(rework.nokId)
    nok.productStatus = rework.reworkStatus === ReworkStatus.COMPLETED ? ProductStatus.REWORKED : ProductStatus.REWORK_INPROGRESS;
    nok.update({ 'productStatus' : nok.productStatus });

    /*
    // Rework Action Data
    if (newReworkData.reworkActionsId && newReworkData.reworkActionsId.length > 0) {
      await rework.addRework(newReworkData.reworkActionsId);
    }    
    
    // Affected Recipes
    console.log('** ** * Method test ', typeof rework.addRecipes);
    if (newReworkData.affectedRecipes && newReworkData.affectedRecipes.length > 0) {
      await rework.addRecipes(newReworkData.affectedRecipes);
    }
*/
    if (rework.id && 'dismantledMaterials' in newReworkData && newReworkData.dismantledMaterials) {
    await handleDismantledMaterials(rework.id, newReworkData.dismantledMaterials);

    }
    return rework;
  } catch(err : unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    console.log('## ERROR * creqate rework ', errorMessage);
    
    throw new Error(errorMessage);
  }
}


// Update an Rework
const updateRework = async (id: number, reworkData: unknown) => { 
  
  // test data
  console.log(' * rework -> id:', id, ' raw data ->',reworkData);
  
  const newReworkData = await reworkDataProcessor(reworkData);

  console.log('** * rework -> newReworkData', newReworkData);

  
 try {
    const rework = await NokRework.findByPk(id);
    if(!rework) {
      throw new Error('Rework not found!');
    }
  
    const updatedRework = await rework.update(newReworkData);
    return updatedRework;
  } catch(err : unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};


const handleDismantledMaterials = async (reworkId: number, dismantledMaterialData: DismantledMaterialData[]) : Promise<NokRework> => {
   
  const rework = await NokRework.findByPk(reworkId);
  console.log(' ** created Rework + dismantled Material ->', rework);
  
  if(rework) {
    // delete previous rework Boms 
    await NokDismantleMaterials.destroy({ where: { 'rework_id' : rework.id}})
    console.log('here');
  

  //let dismantledMaterials : NokDismantleMaterials[] = []

  for (const item of dismantledMaterialData) {
    const dismantled = {
      nokId: rework.nokId,
      reworkId: rework.id,
      materialId: item.material,
      recipeBomId: item.recipeBomId,
      reusable: item.reusable,
      actualDismantledQty: item.actualDismantledQty,
      materialStatus: item.materialStatus,
      ClaimStatus: ClaimStatus.PENDING,
      rwDismantledMaterialId: item.rwDismantledMaterialId
  }

    console.log('dismantled * rady to create->', dismantled);
    const testcreate = await NokDismantleMaterials.create(dismantled)
    console.log('++++ test create ->', testcreate);
    //dismantledMaterials.push(dismantled)
  }
  try {
    //await RwDismantledMaterials.bulkCreate(dismantledMaterials);
    const result = await NokRework.findByPk(reworkId);

    if (!result) {
      throw new Error('Rework not found!');
    }

    return result;
    
  } catch(err : unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    console.log('**** error :', errorMessage);
    
    throw new Error(errorMessage);
  }
} else {
  throw new Error('Rework not found!');
}

}

export default {
  getAllReworks,
  getRework,
  getReworksByNok,
  createRework,
  updateRework,
}