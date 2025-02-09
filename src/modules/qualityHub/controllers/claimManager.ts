import { Request, Response } from 'express';
//import { ExtendedRequest } from '../../usersAndAuthentication/types';
import claimManagerServices from '../services/claimManager';


// Get All Claims
const getAllClaims = async (_req: Request, res: Response) => {
  try{
    const claims = await claimManagerServices.getAllClaims();
    res.json(claims);
  } catch (err) { 
    console.log(err);
    res.status(400).json({ error: 'No Claim found' });
  }
};

// Get Pending Claims
const getPendingClaims = async (_req: Request, res: Response) => {
  try{
    const claims = await claimManagerServices.getPendingClaims();
    res.json(claims);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'No Claim found' });
  }
};


// Update Claim Status
const updateClaimStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const claimData  = req.body;
  console.log(' claim status body :', req.body);
  
  console.log('updateClaimStatus * id ->', id, ' Claim status ->', claimData);
  try {
    const claim = await claimManagerServices.updateClaimStatus(Number(id), claimData);
    res.json(claim);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Claim not found' });
  }
};

export default {
  getAllClaims,
  getPendingClaims,
  updateClaimStatus
};