import { Material, MaterialQuery } from '../../../models';
import { MaterialData } from '../types';
import { materialProcessor } from '../utils/dataProcessor';

// Define Material query 

const query: MaterialQuery = {
  attributes: { exclude: [] },
};


// Get all Materials
const getAllMaterials = async(): Promise<Material[]> => {

  try {
    const materials = await Material.findAll(query);
    return materials;
  } catch (err : unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    console.log('**** error :', errorMessage);
    throw new Error(errorMessage);
  }
};

// Get a Material based on ID
const getMaterial = async(id: number): Promise<Material> => {
  const material = await Material.findByPk(id,query);
 
  if (!material) {
    throw new Error ('the material not found');
  }
  return material;
};

// Create a new Material
const createMaterial = async (materialData: unknown): Promise<Material> => {

  console.log(' ** materilas service * create ** material data ->', materialData);
  

  const newMaterialData : MaterialData = await materialProcessor(materialData);

  console.log(' ** materilas service * create ** process data ->', newMaterialData);


  try {
    const material = await Material.create(newMaterialData);
    return material;
  } catch(err : unknown) {
      let errorMessage = '';
      if (err instanceof Error) {
        errorMessage += ' Error: ' + err.message;
      }
      throw new Error(errorMessage);
    }
};

// Update an Material
const updateMaterial = async (id: number, materialData: unknown): Promise<Material>=> {  
  
  const newMaterialData = await materialProcessor(materialData);

  try {
    const material = await Material.findByPk(id);
    if(!material) {
      throw new Error('Material not found!');
    }
    const updatedMaterial = await material.update(newMaterialData);
    return updatedMaterial;
  } catch(err : unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

export default {
  getAllMaterials,
  getMaterial,
  createMaterial,
  updateMaterial,
};