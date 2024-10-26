import { Rework, Product, Station, ReworkQuery, RwDismantledMaterials, NokCode, RecipeBoms, Material, Recipe } from '../../../models';
import { NewRwDismantledMaterialData, RwDismantledMaterialData } from '../types';
import { reworkDataProcessor } from '../utils/reworkDataProcessor';

//import { Rework, Product, ReworkQuery, Station, ReworkBoms, Material } from '../../../models';
//import { ConsumingMaterial, Reusable } from '../types';
//import { reworkProcessor } from '../utils/dataProcessor';

// Define Rework query 
const query: ReworkQuery = {
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

// Get all Reworks
const getAllReworks = async(): Promise<Rework[]> => {
  try {
    const reworks = await Rework.findAll(query);
    console.log('++++ **** ***** +++ **** +++* ************');

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
const getRework = async(id: number): Promise<Rework> => {
  const rework = await Rework.findByPk(id,query);
  console.log('**** **** ***** +++ **** +++* ************');
  
  console.log('rework by id -> ', rework);
  
 
  if (!rework) {
    throw new Error ('the rework not found');
  }
  return rework;
};

// Get Reworks by product
const getReworksByProduct = async (productId: number): Promise<Rework[]> => {
  try {
    const reworks = await Rework.findAll({
      where: { productId },
      ...query,
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
const createRework = async (reworkData: unknown): Promise<null> => {

  // test data
  const newReworkData = await reworkDataProcessor(reworkData);

  console.log('** * rework -> newReworkData', newReworkData);

  try {
    const rework = await Rework.create(newReworkData);
    console.log('** * rework -> create', rework);

    if (rework.id && 'dismantledMaterials' in newReworkData && newReworkData.dismantledMaterials) {
    await handleDismantledMaterials(rework.id, newReworkData.dismantledMaterials);

    }
  } catch(err : unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    console.log('## ERROR * creqate rework ', errorMessage);
    
    throw new Error(errorMessage);
  }
  
  return null
}
  /*


  try {
    const rework = await Rework.create(newReworkData);
    if (rework.id && 'materialsData' in newReworkData) {
      await updateBoms(rework.id, newReworkData.materialsData);
    }
    return rework;
  } catch(err : unknown) {
      let errorMessage = '';
      if (err instanceof Error) {
        errorMessage += ' Error: ' + err.message;
      }
      throw new Error(errorMessage);
    }
    */

// Update an Rework
const updateRework = async (id: number, reworkData: unknown) => { 
  
  // test data
  console.log(' * rework -> id:', id, ' raw data ->',reworkData);
  
  const newReworkData = await reworkDataProcessor(reworkData);

  console.log('** * rework -> newReworkData', newReworkData);
/*
  
 try {
    const rework = await Rework.findByPk(id);
    if(!rework) {
      throw new Error('Rework not found!');
    }
    await updateBoms(rework.id, newReworkData.materialsData);
    const updatedRework = await rework.update(newReworkData);
    return updatedRework;
  } catch(err : unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
  */
};


const handleDismantledMaterials = async (reworkId: number, dismantledMaterialData: NewRwDismantledMaterialData[]) : Promise<Rework> => {
   
  const rework = await Rework.findByPk(reworkId);
  if(rework) {
    // delete previous rework Boms 
  //await RwDismantledMaterials.destroy({ where: { 'reworkId' : rework.id}})
  console.log('here');
  

  // create new rework Boms
  let dismantledMaterials : RwDismantledMaterialData[] = []

  for (const item of dismantledMaterialData) {
    const dismantled = {
      reworkId: rework.id,
      recipeBomId: item.recipeBomId,
      //recipeId: item.recipeId,
      //materialId: item.materialId,
      dismantledQty: item.dismantledQty,
      note: item.note,
      mandatoryRemove: item.mandatoryRemove
    }
    RwDismantledMaterials.create(dismantled)
    dismantledMaterials.push(dismantled)
  }
  try {
    //await RwDismantledMaterials.bulkCreate(dismantledMaterials);
    const result = await Rework.findByPk(reworkId, query);

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
  getReworksByProduct,
  createRework,
  updateRework,
}