import { Machine, MachineQuery, Station } from '../../../models';
import { MachineData } from '../types';
import { machineProcessor } from '../utils/dataProcessor';

// Define Machine query

const query: MachineQuery = {
  attributes: { exclude: [] },
  include: [
    {
      model: Station,
      as: 'station',
      attributes: ['id', 'stationName', 'stationCode'],
    },
  ],
};

// Get all Machines
const getAllMachines = async (): Promise<Machine[]> => {
  try {
    const machines = await Machine.findAll(query);
    return machines;
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    console.log('**** error :', errorMessage);
    throw new Error(errorMessage);
  }
};

// Get a Machine based on ID
const getMachine = async (id: number): Promise<Machine> => {
  const machine = await Machine.findByPk(id, query);

  if (!machine) {
    throw new Error('the machine not found');
  }
  return machine;
};

// Create a new Machine
const createMachine = async (machineData: unknown): Promise<Machine> => {
  const newMachineData: MachineData = machineProcessor(machineData);

  try {
    const machine = await Machine.create(newMachineData);
    return machine;
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

// Update an Machine
const updateMachine = async (id: number, machineData: unknown): Promise<Machine> => {
  const newMachineData = machineProcessor(machineData);

  try {
    const machine = await Machine.findByPk(id);
    if (!machine) {
      throw new Error('Machine not found!');
    }
    const updatedMachine = await machine.update(newMachineData);
    return updatedMachine;
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

export default {
  getAllMachines,
  getMachine,
  createMachine,
  updateMachine,
};
