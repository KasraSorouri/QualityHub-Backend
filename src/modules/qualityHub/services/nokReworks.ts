import { DismantleMaterials, NokRework } from '../../../models';
import { DismantledMaterialData } from '../types';
import { reworkDataProcessor } from '../utils/nokDataProcessor';

// Define Rework query 
/*
const query: NokReworkQuery = {
  attributes: { exclude: [] },
  include: [
    {
      model: Product,
      as: 'product',
      attributes: ['id', 'productName', 'productCode'],
    },
    {
      model: Station,
      as: 'station',
      attributes: ['id', 'stationName', 'stationCode'],
    },
    {
      model: NokCode,
      as: 'nokCode',
      attributes: ['id', 'nokCode'],
    },
    {
      model: RwDismantledMaterials,
      as: 'rwDismantledMaterials',
      attributes: [ 'dismantledQty', 'note', 'mandatoryRemove'],
      include: [
        {
        model: RecipeBoms,
        as: 'recipeBom',
        attributes: ['id', 'qty', 'reusable'],
        include: [
          {
            model: Material,
            as: 'material',
            attributes: ['id', 'itemShortName', 'itemLongName', 'itemCode', 'price', 'unit', 'traceable', 'active'],
          },
          {
            model: Recipe,
            as: 'recipe',
            attributes: ['recipeCode'],
          }
        ],
      }]
    }

  ]
};
*/
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

// Get Reworks by product
const getReworksByNok = async (nokId: number): Promise<NokRework[]> => {
  try {
    const reworks = await NokRework.findAll({
      where: { nokId },
      //...query,
    });

    console.log(' rework by product ->', reworks);
    
    return reworks;
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
  console.log('** NOK * rework -> newReworkData', reworkData);

  // test data
  const newReworkData = await reworkDataProcessor(reworkData);

  console.log('** * rework -> newReworkData', newReworkData);

  try {
    const rework = await NokRework.create(newReworkData)
    console.log('** * rework -> create', rework);

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
  if(rework) {
    // delete previous rework Boms 
    await DismantleMaterials.destroy({ where: { 'reworkId' : rework.id}})
    console.log('here');
  

  // create new rework Boms
  let dismantledMaterials : DismantledMaterialData[] = []

  for (const item of dismantledMaterialData) {
    const dismantled = {
      material: item.material,
      recipeBom: item.recipeBom,
      dismantledQty: item.dismantledQty,
      status: item.status,
    }
    DismantleMaterials.create(dismantled)
    dismantledMaterials.push(dismantled)
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