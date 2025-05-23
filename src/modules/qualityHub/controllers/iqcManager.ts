import { Request, Response } from 'express';
//import { ExtendedRequest } from '../../usersAndAuthentication/types';
import iqcManagerServices from '../services/iqcManager';


// Get All IQCs 
const getAllIQCs = async (_req: Request, res: Response) => {
  try{
    const iqcs = await iqcManagerServices.getAllIQCs();
    res.json(iqcs);
  } catch (err) { 
    console.log(err);
    res.status(400).json({ error: 'No IQC found' });
  }
};

// Get Pending IQCs
const getPendingIQCs = async (_req: Request, res: Response) => {
  try{
    const iqcs = await iqcManagerServices.getPendingIQCs();
    res.json(iqcs);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'No IQC found' });
  }
};

// Update Material Status
const updateMaterialStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { materialStatus } = req.body;
  console.log('updateMaterialStatus * id ->', id, ' Material status ->', materialStatus);
  try {
    const material = await iqcManagerServices.updateMaterialStatus(Number(id), materialStatus);
    res.json(material);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'IQC not found' });
  }
};

export default {
  getAllIQCs,
  getPendingIQCs,
  updateMaterialStatus  
};