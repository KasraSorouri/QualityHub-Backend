import { Rca, RcaCode } from '../../../models';
import { nokRcaProcessor } from '../utils/nokRcaProcessor';

// Get all Costs
const getAllRcas = async (): Promise<Rca[]> => {
  const rcas = await Rca.findAll();
  return rcas;
};

// Get a Rca by ID
const getRca = async (id: number): Promise<Rca> => {
  const rca = await Rca.findByPk(id);

  if (!rca) {
    throw new Error('the rca not found');
  }
  return rca;
};

// Get a RCA by NOK ID
const getNokRcaByNok = async (nokId: number): Promise<Rca[]> => {
  try {
    const nokRcas = await Rca.findAll({
      where: { nokId },
      include: [RcaCode],
    });

    return nokRcas;
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

// Create a new Cost
const createNokRca = async (nokRcaData: unknown): Promise<Rca> => {
  // Validate data
  const newNokRcaData = nokRcaProcessor(nokRcaData);

  try {
    const [result] = await Rca.upsert(newNokRcaData);
    return result;
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

// Remove a Rca
const deleteRca = async (id: number): Promise<boolean> => {
  try {
    const result = await Rca.destroy({
      where: { id },
    });

    return result ? true : false;
  } catch (err) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

export default {
  getAllRcas,
  getRca,
  getNokRcaByNok,
  createNokRca,
  deleteRca,
};
