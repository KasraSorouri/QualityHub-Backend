import { Right } from '../../../models';
import { rightProcessor } from '../utils/dataProcessor';

// Get All rights
const getAllRights = async(): Promise<Right[]> => {
  const result = await Right.findAll({});
  return result;
};

// Get a right based on ID
const getRight = async(id: number): Promise<Right> => {
  const result = await Right.findByPk(id);
  if (!result) {
    throw new Error ('the right not found');
  }
  return result;
};

// Create a new right
const createRight = async (rightData: unknown): Promise<Right> => {
  
  const newRightData = rightProcessor(rightData);

  const { right, relatedModule } = newRightData;
    try {
      const newRight = await Right.create({ right, relatedModule });
      return newRight;
    } catch(err : unknown) {
      let errorMessage = 'Something went wrong.';
      if (err instanceof Error) {
        errorMessage += ' Error: ' + err.message;
      }
      throw new Error(errorMessage);
    } 
};

// Update a right
const updateRight = async (id: number, rightData: unknown): Promise<Right> => {
  const newRightData = rightProcessor(rightData);

  try {
    const right = await Right.findByPk(id);
    if (!right) {
      throw new Error('Right not found!');
    }
    await right.update(newRightData);
    return right;
  } catch(err : unknown) {
    let errorMessage = 'Something went wrong.';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
}

export default {
  getAllRights,
  getRight,
  createRight,
  updateRight,
};