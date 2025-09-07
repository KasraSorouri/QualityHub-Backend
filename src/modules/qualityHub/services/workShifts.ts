import { WorkShift, WorkShiftQuery } from '../../../models';
import { WorkShiftData } from '../types';
import { workShiftProcessor } from '../utils/dataProcessor';

// Define WorkShift query
const query: WorkShiftQuery = {
  attributes: { exclude: [] },
};

// Get all WorkShifts
const getAllWorkShifts = async (): Promise<WorkShift[]> => {
  try {
    const workShifts = await WorkShift.findAll();
    return workShifts;
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

// Get a WorkShift based on ID
const getWorkShift = async (id: number): Promise<WorkShift> => {
  const workShift = await WorkShift.findByPk(id, query);

  if (!workShift) {
    throw new Error('the workShift not found');
  }
  return workShift;
};

// Create a new WorkShift
const createWorkShift = async (workShiftData: unknown): Promise<WorkShift> => {
  const newWorkShiftData: WorkShiftData = workShiftProcessor(workShiftData);

  try {
    const workShift = await WorkShift.create(newWorkShiftData);
    return workShift;
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

// Update an WorkShift
const updateWorkShift = async (id: number, workShiftData: unknown): Promise<WorkShift> => {
  const newWorkShiftData = workShiftProcessor(workShiftData);

  try {
    const workShift = await WorkShift.findByPk(id);
    if (!workShift) {
      throw new Error('WorkShift not found!');
    }
    const updatedWorkShift = await workShift.update(newWorkShiftData);
    return updatedWorkShift;
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

export default {
  getAllWorkShifts,
  getWorkShift,
  createWorkShift,
  updateWorkShift,
};
