import { ProductGrp } from '../../../models';
import { productGrpProcessor } from '../utils/dataProcessor';

// Get all Products
const getAllProductGrps = async(): Promise<ProductGrp[]> => {
  
  //const products = await Product.findAll(query);
  const productGrps = await ProductGrp.findAll();
  return productGrps;
};

// Get a Product based on ID
const getProductGrp = async(id: number): Promise<ProductGrp> => {
  const productGrp = await ProductGrp.findByPk(id);
 
  if (!productGrp) {
    throw new Error ('the product group not found');
  }
  return productGrp;
};

// Create a new Product Group
const createProductGrp = async (productGrpData: unknown): Promise<ProductGrp> => {

  const newProductGrpData = await productGrpProcessor(productGrpData);
  
  try {
    const productGrp = await ProductGrp.create(newProductGrpData);
    console.log('product * service * createProduct ->', productGrp);

    return productGrp;
  } catch(err : unknown) {
      let errorMessage = '';
      if (err instanceof Error) {
        errorMessage += ' Error: ' + err.message;
      }
      throw new Error(errorMessage);
    }
};

// Update an Product
const updateProductGrp = async (id: number, productGrpData: unknown): Promise<ProductGrp>=> {  
  
  const newProductGrpData = await productGrpProcessor(productGrpData);

  try {
    const productGrp = await ProductGrp.findByPk(id);
    if(!productGrp) {
      throw new Error('Product Group not found!');
    }
    const updatedProductGrp = await productGrp.update(newProductGrpData);
    return updatedProductGrp;
  } catch(err : unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

export default {
  getAllProductGrps,
  getProductGrp,
  createProductGrp,
  updateProductGrp,
};