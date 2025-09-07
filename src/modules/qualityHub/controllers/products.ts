import productServices from '../services/products';
import { Request, Response } from 'express';
import { ExtendedRequest } from '../../usersAndAuthentication/types';

// Get All Products
const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await productServices.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'No product found' });
  }
};

// Get a Product by Id
const getProduct = async (req: ExtendedRequest, res: Response) => {
  const id = req.params.id;
  try {
    const product = await productServices.getProduct(Number(id));
    res.json(product);
  } catch (err) {
    res.status(404).json({ error: 'Product not found' });
  }
};

// Create a New Product
const addProduct = async (req: ExtendedRequest, res: Response) => {
  const productData: unknown = req.body;
  try {
    const result = await productServices.createProduct(productData);
    res.status(201).json(result);
  } catch (err: unknown) {
    let errorMessage = 'Something went wrong.';
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    res.status(409).json({ error: `${errorMessage}` });
  }
};

// Edit an Existing Product
const editProduct = async (req: ExtendedRequest, res: Response) => {
  const id = Number(req.params.id);
  if (!((req.decodedToken && id === req.decodedToken.id) || req.permited)) {
    res.status(401).json({ error: 'Operation not allowed' });
  }
  const productData: unknown = req.body;
  try {
    const result = await productServices.updateProduct(id, productData);
    res.status(201).json(result);
  } catch (err: unknown) {
    let errorMessage = 'Something went wrong.';
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    res.status(409).json({ error: `${errorMessage}` });
  }
};

export default {
  getAllProducts,
  getProduct,
  addProduct,
  editProduct,
};
