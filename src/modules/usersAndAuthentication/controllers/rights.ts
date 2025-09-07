import rightServices from '../services/rights';
import { Request, Response } from 'express';
import { ExtendedRequest } from '../types';

// Get all rights
const getAllRights = async (_req: Request, res: Response) => {
  try {
    const rights = await rightServices.getAllRights();
    res.json(rights);
  } catch (err) {
    res.status(500).json({ error: 'No right found' });
  }
};

// get a right with ID
const getRight = async (req: ExtendedRequest, res: Response) => {
  const id = req.params.id;
  try {
    const right = await rightServices.getRight(Number(id));
    res.json(right);
  } catch (err) {
    res.status(404).json({ error: 'Right not found' });
  }
};

// Create a new Right
const addRight = async (req: ExtendedRequest, res: Response) => {
  const rightData: unknown = req.body;
  try {
    const newRight = await rightServices.createRight(rightData);
    res.status(201).json(newRight);
  } catch (err) {
    res.status(409).json({ error: `${err}` });
  }
};

// Update a Right
const editRight = async (req: ExtendedRequest, res: Response) => {
  const id = req.params.id;
  const rightData: unknown = req.body;
  try {
    const updatedRight = await rightServices.updateRight(Number(id), rightData);
    res.json(updatedRight);
  } catch (err) {
    res.status(404).json({ error: 'Right not found' });
  }
};

export default {
  getAllRights,
  getRight,
  addRight,
  editRight,
};
