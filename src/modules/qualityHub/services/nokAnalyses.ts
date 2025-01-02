import { ClassCode, NokAnalyse, NokCode, NokDetectQuery, Station, WorkShift } from '../../../models';
import { Analyse } from '../types';
import { nokAnalyseDataProcessor } from '../utils/nokAnalyseDataProcessor';
import nokCostsServise from './nokCosts';

const query: NokDetectQuery = {
  attributes: { exclude: [] },
  include: [
    {
      model: Station,
      as: 'causeStation',
      attributes: ['id', 'stationName', 'stationCode'],
    },
    {
      model: NokCode,
      as: 'nokCode',
      attributes: ['id', 'nokCode', 'nokDesc'],
    },
    {
      model: WorkShift,
      as: 'causeShift',
      attributes: ['id', 'shiftName', 'shiftCode'],
    },
    {
      model: ClassCode,
      as: 'classCode',
    }
  ]
};

// Get all Analyses
const getAllAnalyses = async(): Promise<Analyse[]> => {
  
  const analyses = await NokAnalyse.findAll(query);
  return analyses;
}

// Get a Analyse by ID
const getAnalyse = async(id: number): Promise<Analyse> => {
  const analyse = await NokAnalyse.findByPk(id,query);

  if (!analyse) {
    throw new Error ('the analyse not found');
  }
  return analyse;
};

// Get a Analyse by NOK ID
const getNokAnalyseByNok = async (nokId: number): Promise<Analyse> => {
  
  try {
    const nokAnalyses = await NokAnalyse.findAll({
      where: { nokId }, 
      attributes: query.attributes,
      include: query.include,
      });


      if (nokAnalyses.length === 0) {
        throw new Error(`No analyses found for nokId: ${nokId}`);
      }
      // add Nok Cost to the result 

      const costResult  =await nokCostsServise.calculateNokCost(nokId)

      console.log('Nok Analyse * costResult ->', costResult);

      const result = { ...nokAnalyses[0].toJSON(), costResult }
      console.log('Nok Analyse * result ->', result);
    return result;
  } catch (err : unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    console.log('**** error :', errorMessage);
    throw new Error(errorMessage);
  }
}


// Create a new Analyse
const createNokAnalyse = async (nokAnalyseData: unknown): Promise<Analyse> => {
  console.log('** NOK Analysis Srvice * Analyse -> Raw data', nokAnalyseData);

  // Validate data
  const newNokAnalyseData = await nokAnalyseDataProcessor(nokAnalyseData);
  console.log('** NOK Analysis Srvice * Analyse -> Processed data', nokAnalyseData);

  try {
    const [result] = await NokAnalyse.upsert(newNokAnalyseData)

    return result   
  } catch(err : unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    console.log('## ERROR * creqate Analyse ', errorMessage);
    throw new Error(errorMessage);
  }
}

// Remove a Analyse
const deleteAnalyse = async (id : number) : Promise<boolean>=> {

  try {
    const result = await NokAnalyse.destroy({
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
  getAllAnalyses,
  getAnalyse,
  getNokAnalyseByNok,
  createNokAnalyse,
  deleteAnalyse
}


