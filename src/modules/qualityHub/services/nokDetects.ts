import { NokDetect, Product, NokDetectQuery, Station, NokCode, WorkShift } from '../../../models';
import { NewNokData } from '../types';
import { nokDataProcessor } from '../utils/nokDataProcessor';

// Define NokDetect query
const query: NokDetectQuery = {
  attributes: { exclude: [] },
  include: [
    {
      model: Product,
      as: 'product',
      attributes: ['id', 'productName', 'productCode'],
    },
    {
      model: Station,
      as: 'detectedStation',
      attributes: ['id', 'stationName', 'stationCode'],
    },
    {
      model: NokCode,
      as: 'initNokCode',
      attributes: ['id', 'nokCode', 'nokDesc'],
    },
    {
      model: WorkShift,
      as: 'detectedShift',
      attributes: ['id', 'shiftName', 'shiftCode'],
    },
  ],
};

// Get all NokDetects
const getAllNokDetects = async (): Promise<NokDetect[]> => {
  try {
    const nokDetects = await NokDetect.findAll(query);
    return nokDetects;
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

// Get a NokDetect based on ID
const getNokDetect = async (id: number): Promise<NokDetect> => {
  const nokDetect = await NokDetect.findByPk(id, query);

  if (!nokDetect) {
    throw new Error('the nokDetect not found');
  }
  return nokDetect;
};

// Get NokDetects by product
const getNokDetectsByProduct = async (productId: number): Promise<NokDetect[]> => {
  try {
    const nokDetects = await NokDetect.findAll({
      where: { productId },
      ...query,
    });

    return nokDetects;
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

// Create a new NokDetect
const createNokDetect = async (nokDetectData: unknown): Promise<NokDetect> => {
  const newNokDetectData: NewNokData = nokDataProcessor(nokDetectData);

  try {
    const nokDetect = await NokDetect.create(newNokDetectData);
    return nokDetect;
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

// Update an NokDetect
const updateNokDetect = async (id: number, nokDetectData: unknown): Promise<NokDetect> => {
  const newNokDetectData = nokDataProcessor(nokDetectData);

  try {
    const nokDetect = await NokDetect.findByPk(id);
    if (!nokDetect) {
      throw new Error('NOK not found!');
    }
    const updatedNokDetect = await nokDetect.update(newNokDetectData);
    return updatedNokDetect;
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

export default {
  getAllNokDetects,
  getNokDetect,
  getNokDetectsByProduct,
  createNokDetect,
  updateNokDetect,
};
