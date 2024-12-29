import { Rca, RcaCode } from '../../../models';
import { nokRcaProcessor } from '../utils/nokRcaProcessor';


// Get all Costs
const getAllRcas = async(): Promise<Rca[]> => {
  
  const rcas = await Rca.findAll();
  return rcas;
}

// Get a Rca by ID
const getRca = async(id: number): Promise<Rca> => {
  const rca = await Rca.findByPk(id);

  if (!rca) {
    throw new Error ('the rca not found');
  }
  return rca;
};

// Get a RCA by NOK ID
const getNokRcaByNok = async (nokId: number): Promise<Rca[]> => {
  try {
    const nokRcas = await Rca.findAll({
      where: { nokId },
      include: [
        RcaCode
      ]});

    return nokRcas;
  } catch (err : unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    console.log('**** error :', errorMessage);
    throw new Error(errorMessage);
  }
}


// Create a new Cost
const createNokRca = async (nokRcaData: unknown): Promise<Rca> => {
  console.log('** * RCA -> Raw data', nokRcaData);

  // Validate data
  const newNokRcaData = await nokRcaProcessor(nokRcaData);

  try {
    const [result] = await Rca.upsert(newNokRcaData)
    return result   
  } catch(err : unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    console.log('## ERROR * creqate RCA ', errorMessage);
    throw new Error(errorMessage);
  }
}

// Remove a Rca
const deleteRca = async (id : number) : Promise<boolean>=> {

  try {
    const result = await Rca.destroy({
      where: { id }
    });
    console.log('RCA Service * delete RCA * result ->', result);
    
    return result ? true : false;
  } catch (err) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    console.log('## ERROR * delete RCA ', errorMessage);
    throw new Error(errorMessage);
  }
};


export default {
  getAllRcas,
  getRca,
  getNokRcaByNok,
  createNokRca,
  deleteRca
}


