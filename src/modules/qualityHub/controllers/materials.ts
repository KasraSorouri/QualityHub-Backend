import materialServices from '../services/materials';
import { Request, Response } from 'express';
import { ExtendedRequest } from '../../usersAndAuthentication/types';

// Get All Materials
const getAllMaterials = async (_req: Request, res: Response): Promise<void> => {
  try {
    const materials = await materialServices.getAllMaterials();
    res.json(materials);
  } catch (err) {
    res.status(500).json({ error: 'No material found' });
  }
};

// Get a Material by Id
const getMaterial = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    const material = await materialServices.getMaterial(Number(id));
    res.json(material);
  } catch (err) {
    res.status(404).json({ error: 'Material not found' });
  }
};

// Create a New Material
const addMaterial = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const materialData: unknown = req.body;
  try {
    const result = await materialServices.createMaterial(materialData);
    res.status(201).json(result);
  } catch (err: unknown) {
    let errorMessage = 'Something went wrong.';
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    res.status(409).json({ error: `${errorMessage}` });
  }
};

// Edit an Existing Material
const editMaterial = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  if (!((req.decodedToken && id === req.decodedToken.id) || req.permited)) {
    res.status(401).json({ error: 'Operation not allowed' });
  }
  const materialData: unknown = req.body;
  try {
    const result = await materialServices.updateMaterial(id, materialData);
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
  getAllMaterials,
  getMaterial,
  addMaterial,
  editMaterial,
};
