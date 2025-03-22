import { parseId } from "../../../utils/dataValidator";
import { NewNokRcaData } from "../types";
import { parseDescription } from "./dataProcessor";

const nokRcaProcessor = async (nokRcaData: unknown): Promise<NewNokRcaData> => {
  // Validate input data
  console.log('NOk RCA Processing Start!');
  
   if (!nokRcaData || 
    typeof nokRcaData !== 'object' || 
    !('nokId' in nokRcaData) ||
    !('rcaCodeId' in nokRcaData)) {
    console.log('Incorrect or missing Data ** NOK RCA * 0 *');
    throw new Error('Incorrect or missing Data ** NOK RCA * 0 *');
  }

  const newRcaData: NewNokRcaData = {
    id : 'id' in nokRcaData ? parseId((nokRcaData.id as any)) : undefined,
    nokId: parseId((nokRcaData.nokId as any)),
    rcaCodeId: parseId((nokRcaData.rcaCodeId as any)),
    whCauseId: 'whCauseId' in nokRcaData ? parseId(Number(nokRcaData.whCauseId as any)) : undefined, 
    whCauseName: 'whCauseName' in nokRcaData ? parseDescription(nokRcaData.whCauseName as any) : undefined, 
    description: 'description' in nokRcaData ? parseDescription(nokRcaData.description as any) : undefined,
    improveSuggestion: 'improveSuggestion' in nokRcaData ? parseDescription(nokRcaData.improveSuggestion as any) : undefined,
    createBy: 1,
    createAt: new Date()
  }; 

  console.log('NOk RCA Processing Finish Successfully!');
  
  return newRcaData;
};
export {
  nokRcaProcessor,
}