import nokDetectServices from '../services/nokDetects';
import { Request, Response } from 'express';
import { ExtendedRequest } from '../../usersAndAuthentication/types';

// Get All NOK Detects
const getAllNokDetects = async (_req: Request, res: Response) => {
  try {
    const nokDetects = await nokDetectServices.getAllNokDetects();
    res.json(nokDetects);
  } catch (err) {
    res.status(500).json({ error: 'No NOK found' });
  }
};

// Get a NOK Detect by Id
const getNokDetect = async (req: ExtendedRequest, res: Response) => {
  const id = req.params.id;
  try {
    const nokDetect = await nokDetectServices.getNokDetect(Number(id));
    res.json(nokDetect);
  } catch (err) {
    res.status(404).json({ error: 'No NOK found' });
  }
};

// Get NOK Detects by Product Id
const getNokDetectsByProduct = async (req: ExtendedRequest, res: Response) => {
  const productId = Number(req.params.id);
  if (!productId) {
    res.status(400).json({ error: 'Invalid product id' });
  }
  try {
    const nokDetects = await nokDetectServices.getNokDetectsByProduct(productId);
    res.json(nokDetects);
  } catch (err) {
    res.status(404).json({ error: 'No NOK found' });
  }
};

// Create a New NOK Detect
const addNokDetect = async (req: ExtendedRequest, res: Response) => {
  const nokDetectData: unknown = req.body;
  try {
    const result = await nokDetectServices.createNokDetect(nokDetectData);
    res.status(201).json(result);
  } catch (err: unknown) {
    let errorMessage = 'Something went wrong.';
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    res.status(409).json({ error: `${errorMessage}` });
  }
};

// Edit an Existing NOK Detect
const editNokDetect = async (req: ExtendedRequest, res: Response) => {
  const id = Number(req.params.id);
  if (!((req.decodedToken && id === req.decodedToken.id) || req.permited)) {
    res.status(401).json({ error: 'Operation not allowed' });
  }
  const nokDetectData: unknown = req.body;
  try {
    const result = await nokDetectServices.updateNokDetect(id, nokDetectData);
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
  getAllNokDetects,
  getNokDetect,
  getNokDetectsByProduct,
  addNokDetect,
  editNokDetect,
};
