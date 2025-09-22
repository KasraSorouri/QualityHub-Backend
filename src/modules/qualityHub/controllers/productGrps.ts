import productGrpServices from '../services/productGrps';
import { Request, Response } from 'express';
import { ExtendedRequest } from '../../usersAndAuthentication/types';

// Get All Product Groups
const getAllProductGrps = async (_req: Request, res: Response): Promise<void> => {
  try {
    const productGrps = await productGrpServices.getAllProductGrps();
    res.json(productGrps);
  } catch (err) {
    res.status(500).json({ error: 'No product group found' });
  }
};

// Get a Product Group by Id
const getProductGrp = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    const productGrp = await productGrpServices.getProductGrp(Number(id));
    res.json(productGrp);
  } catch (err) {
    res.status(404).json({ error: 'Product Group not found' });
  }
};

// Create a New Product Group
const addProductGrp = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const productGrpData: unknown = req.body;
  try {
    const result = await productGrpServices.createProductGrp(productGrpData);
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
const editProductGrp = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  if (!((req.decodedToken && id === req.decodedToken.id) || req.permited)) {
    res.status(401).json({ error: 'Operation not allowed' });
  }
  const productGrpData: unknown = req.body;
  try {
    const result = await productGrpServices.updateProductGrp(id, productGrpData);
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
  getAllProductGrps,
  getProductGrp,
  addProductGrp,
  editProductGrp,
};
