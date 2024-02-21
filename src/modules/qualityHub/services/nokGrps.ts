import { NokGrp } from '../../../models';
import { nokGrpProcessor } from '../utils/dataProcessor';

// Get all Noks
const getAllNokGrps = async(): Promise<NokGrp[]> => {
  
  //const noks = await Nok.findAll(query);
  const nokGrps = await NokGrp.findAll();
  return nokGrps;
};

// Get a Nok based on ID
const getNokGrp = async(id: number): Promise<NokGrp> => {
  const nokGrp = await NokGrp.findByPk(id);
 
  if (!nokGrp) {
    throw new Error ('the nok group not found');
  }
  return nokGrp;
};

// Create a new Nok Group
const createNokGrp = async (nokGrpData: unknown): Promise<NokGrp> => {

  const newNokGrpData = await nokGrpProcessor(nokGrpData);
  
  try {
    const nokGrp = await NokGrp.create(newNokGrpData);
    console.log('nok * service * createNok ->', nokGrp);

    return nokGrp;
  } catch(err : unknown) {
      let errorMessage = '';
      if (err instanceof Error) {
        errorMessage += ' Error: ' + err.message;
      }
      throw new Error(errorMessage);
    }
};

// Update an Nok
const updateNokGrp = async (id: number, nokGrpData: unknown): Promise<NokGrp>=> {  
  
  const newNokGrpData = await nokGrpProcessor(nokGrpData);

  try {
    const nokGrp = await NokGrp.findByPk(id);
    if(!nokGrp) {
      throw new Error('Nok Group not found!');
    }
    const updatedNokGrp = await nokGrp.update(newNokGrpData);
    return updatedNokGrp;
  } catch(err : unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

export default {
  getAllNokGrps,
  getNokGrp,
  createNokGrp,
  updateNokGrp,
};