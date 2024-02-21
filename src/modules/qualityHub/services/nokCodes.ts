import { NokCode, NokCodeQuery, NokGrp } from '../../../models';
import { nokCodeProcessor } from '../utils/dataProcessor';

// Define NOK Code query 

const query: NokCodeQuery = {
  attributes: { exclude: [] },
  include: [
    {
      model: NokGrp,
      as: 'nokGrp',
      attributes: ['nokGrpName', 'nokGrpCode', 'nokGrpDesc', 'id'],
    }]
};


// Get all Noks
const getAllNokCodes = async(): Promise<NokCode[]> => {
  
  //const noks = await Nok.findAll(query);
  const nokCodes = await NokCode.findAll(query);
  return nokCodes;
};

// Get a Nok based on ID
const getNokCode = async(id: number): Promise<NokCode> => {
  const nokCode = await NokCode.findByPk(id,query);
 
  if (!nokCode) {
    throw new Error ('the nok group not found');
  }
  return nokCode;
};

// Create a new Nok Group
const createNokCode = async (nokCodeData: unknown): Promise<NokCode> => {

  const newNokCodeData = await nokCodeProcessor(nokCodeData);
  
  try {
    const nokCode = await NokCode.create(newNokCodeData);
    console.log('nok * service * createNok ->', nokCode);

    return nokCode;
  } catch(err : unknown) {
      let errorMessage = '';
      if (err instanceof Error) {
        errorMessage += ' Error: ' + err.message;
      }
      throw new Error(errorMessage);
    }
};

// Update an Nok
const updateNokCode = async (id: number, nokCodeData: unknown): Promise<NokCode>=> {  
  
  const newNokCodeData = await nokCodeProcessor(nokCodeData);

  try {
    const nokCode = await NokCode.findByPk(id);
    if(!nokCode) {
      throw new Error('Nok Group not found!');
    }
    const updatedNokCode = await nokCode.update(newNokCodeData);
    return updatedNokCode;
  } catch(err : unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

export default {
  getAllNokCodes,
  getNokCode,
  createNokCode,
  updateNokCode,
};