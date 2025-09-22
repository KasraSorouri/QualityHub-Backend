import { Product, ProductGrp, ProductQuery } from '../../../models';
import { ProductData } from '../types';
import { productProcessor } from '../utils/dataProcessor';

// Define Product query

const query: ProductQuery = {
  attributes: { exclude: [] },
  include: [
    {
      model: ProductGrp,
      as: 'productGrp',
      attributes: ['groupName', 'groupCode', 'id'],
    },
  ],
};

// Get all Products
const getAllProducts = async (): Promise<Product[]> => {
  try {
    const products = await Product.findAll(query);
    return products;
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

// Get a Product based on ID
const getProduct = async (id: number): Promise<Product> => {
  const product = await Product.findByPk(id, query);

  if (!product) {
    throw new Error('the product not found');
  }
  return product;
};

// Create a new Product
const createProduct = async (productData: unknown): Promise<Product> => {
  const newProductData: ProductData = productProcessor(productData);

  try {
    const product = await Product.create(newProductData);
    return product;
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

// Update an Product
const updateProduct = async (id: number, productData: unknown): Promise<Product> => {
  const newProductData = productProcessor(productData);

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error('Product not found!');
    }
    const updatedProduct = await product.update(newProductData);
    return updatedProduct;
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

export default {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
};
