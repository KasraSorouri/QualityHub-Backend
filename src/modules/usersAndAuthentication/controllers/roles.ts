import roleServices from '../services/roles';
import { Request, Response } from 'express';
import { ExtendedRequest } from '../types';

const getAllRoles = async (_req: Request, res: Response): Promise<void> => {
  try {
    const roles = await roleServices.getAllRoles();
    res.json(roles);
  } catch (err: unknown) {
    let errorMessage = 'Something went wrong.';
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    res.status(409).json({ error: `${errorMessage}` });
  }
};

const getRole = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    const role = await roleServices.getRole(Number(id));
    res.json(role);
  } catch (err: unknown) {
    let errorMessage = 'Something went wrong.';
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    res.status(409).json({ error: `${errorMessage}` });
  }
};

const addRole = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const roleData: unknown = req.body;
  try {
    const newRole = await roleServices.createRole(roleData);
    res.status(201).json(newRole);
  } catch (err: unknown) {
    let errorMessage = 'Something went wrong.';
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    res.status(409).json({ error: `${errorMessage}` });
  }
};

const editRole = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  if (!((req.decodedToken && id === req.decodedToken.id) || req.permited)) {
    res.status(401).json({ error: 'Operation not allowed' });
  }
  const roleData = req.body as unknown;
  try {
    const newRole = await roleServices.updateRole(id, roleData);
    res.status(200).json(newRole.dataValues);
  } catch (err: unknown) {
    let errorMessage = 'Something went wrong.';
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    res.status(409).json({ error: `${errorMessage}` });
  }
};

export default {
  getAllRoles,
  getRole,
  addRole,
  editRole,
};
