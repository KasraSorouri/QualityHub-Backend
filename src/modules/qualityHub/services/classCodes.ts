import { ClassCode, ClassCodeQuery } from '../../../models';
import { ClassCodeData } from '../types';
import { classCodeProcessor } from '../utils/dataProcessor';

// Define ClassCode query
const query: ClassCodeQuery = {
  attributes: { exclude: [] },
};

// Get all ClassCodes
const getAllClassCodes = async (): Promise<ClassCode[]> => {
  try {
    const classCodes = await ClassCode.findAll(query);
    return classCodes;
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

// Get a ClassCode based on ID
const getClassCode = async (id: number): Promise<ClassCode> => {
  const classCode = await ClassCode.findByPk(id, query);

  if (!classCode) {
    throw new Error('the classCode not found');
  }
  return classCode;
};

// Create a new ClassCode
const createClassCode = async (classCodeData: unknown): Promise<ClassCode> => {
  const newClassCodeData: ClassCodeData = classCodeProcessor(classCodeData);

  try {
    const classCode = await ClassCode.create(newClassCodeData);
    return classCode;
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

// Update an ClassCode
const updateClassCode = async (id: number, classCodeData: unknown): Promise<ClassCode> => {
  const newClassCodeData = classCodeProcessor(classCodeData);

  try {
    const classCode = await ClassCode.findByPk(id);
    if (!classCode) {
      throw new Error('ClassCode not found!');
    }
    const updatedClassCode = await classCode.update(newClassCodeData);
    return updatedClassCode;
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

export default {
  getAllClassCodes,
  getClassCode,
  createClassCode,
  updateClassCode,
};
