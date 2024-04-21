import { RcaCode, RcaCodeQuery } from '../../../models';
import { RcaCodeData } from '../types';
import { rcaCodeProcessor } from '../utils/dataProcessor';

// Define RcaCode query 
const query: RcaCodeQuery = {
  attributes: { exclude: [] },
};


// Get all RcaCodes
const getAllRcaCodes = async(): Promise<RcaCode[]> => {

  try {
    const rcaCodes = await RcaCode.findAll(query);
    return rcaCodes;
  } catch (err : unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    console.log('**** error :', errorMessage);
    throw new Error(errorMessage);
  }
};

// Get a RcaCode based on ID
const getRcaCode = async(id: number): Promise<RcaCode> => {
  const rcaCode = await RcaCode.findByPk(id,query);
 
  if (!rcaCode) {
    throw new Error ('the rcaCode not found');
  }
  return rcaCode;
};

// Create a new RcaCode
const createRcaCode = async (rcaCodeData: unknown): Promise<RcaCode> => {

  const newRcaCodeData : RcaCodeData = await rcaCodeProcessor(rcaCodeData);

  try {
    const rcaCode = await RcaCode.create(newRcaCodeData);
    return rcaCode;
  } catch(err : unknown) {
      let errorMessage = '';
      if (err instanceof Error) {
        errorMessage += ' Error: ' + err.message;
      }
      throw new Error(errorMessage);
    }
};

// Update an RcaCode
const updateRcaCode = async (id: number, rcaCodeData: unknown): Promise<RcaCode>=> {  
  console.log(' ** materilas service * create ** rcaCode data ->', rcaCodeData);

  
  const newRcaCodeData = await rcaCodeProcessor(rcaCodeData);
  console.log(' ** materilas service * create ** process data ->', newRcaCodeData);


  try {
    const rcaCode = await RcaCode.findByPk(id);
    if(!rcaCode) {
      throw new Error('RcaCode not found!');
    }
    const updatedRcaCode = await rcaCode.update(newRcaCodeData);
    return updatedRcaCode;
  } catch(err : unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

export default {
  getAllRcaCodes,
  getRcaCode,
  createRcaCode,
  updateRcaCode,
};