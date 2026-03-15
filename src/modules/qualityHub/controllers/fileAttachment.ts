import { Response } from 'express';
import { ExtendedRequest } from '../../usersAndAuthentication/types';

import fileServices from '../services/fileServices';
import { NokImage } from '../../../models';

// Upload Defact Images
const addDefectImages = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const nokId: number = req.body.nokId as number;
  if (!req.decodedToken || typeof req.decodedToken.id !== 'number') {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
    return;
  }
  const userId: number = req.decodedToken.id;

  try {
    if (!req.files || (Array.isArray(req.files) ? req.files.length === 0 : Object.keys(req.files).length === 0)) {
      res.status(400).json({ message: 'No files provided' });
      return;
    }
    const filesArray = Array.isArray(req.files) ? req.files : Object.values(req.files).flat();
    const savedFiles = await fileServices.uploadNokImages(filesArray, nokId, userId);
    res.status(201).json({ message: 'Success', data: savedFiles });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Get NOK Images
const getNokImages = async (req: ExtendedRequest, res: Response): Promise<void> => {
  try {
    const { nokId } = req.params;
    if (!nokId) {
      res.status(400).json({ message: 'NOK ID is required' });
      return;
    }

    const images: NokImage[] = await fileServices.getNokImages(Number(nokId));
    res.status(200).json({ message: 'Success', data: images });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export default {
  addDefectImages,
  getNokImages,
};
