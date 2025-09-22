import { Request, Response } from 'express';
import claimManagerServices from '../services/claimManager';
import Claim from '../../../models/claim';

// Get All Claims
const getAllClaims = async (_req: Request, res: Response): Promise<void> => {
  try {
    const claims = await claimManagerServices.getAllClaims();
    res.json(claims);
  } catch (err) {
    res.status(400).json({ error: 'No Claim found' });
  }
};

// Get Pending Claims
const getPendingClaims = async (_req: Request, res: Response): Promise<void> => {
  try {
    const claims = await claimManagerServices.getPendingClaims();
    res.json(claims);
  } catch (err) {
    res.status(400).json({ error: 'No Claim found' });
  }
};

// Update Claim Status
const updateClaimStatus = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const claimData = req.body as Claim;

  try {
    const claim = await claimManagerServices.updateClaimStatus(Number(id), claimData);
    res.json(claim);
  } catch (err) {
    res.status(400).json({ error: 'Claim not found' });
  }
};

export default {
  getAllClaims,
  getPendingClaims,
  updateClaimStatus,
};
