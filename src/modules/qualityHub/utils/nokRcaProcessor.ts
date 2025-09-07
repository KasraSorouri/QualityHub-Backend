import { parseId } from '../../../utils/dataValidator';
import { NewNokRcaData } from '../types';
import { parseDescription } from './dataProcessor';

const nokRcaProcessor = (nokRcaData: unknown): NewNokRcaData => {
  // Validate input data
  console.log('NOk RCA Processing Start!');

  if (!nokRcaData || typeof nokRcaData !== 'object' || !('nokId' in nokRcaData) || !('rcaCodeId' in nokRcaData)) {
    console.log('Incorrect or missing Data ** NOK RCA * 0 *');
    throw new Error('Incorrect or missing Data ** NOK RCA * 0 *');
  }

  const newRcaData: NewNokRcaData = {
    id: 'id' in nokRcaData ? parseId(nokRcaData.id) : undefined,
    nokId: parseId(nokRcaData.nokId),
    rcaCodeId: parseId(nokRcaData.rcaCodeId),
    whCauseId: 'whCauseId' in nokRcaData ? parseId(Number(nokRcaData.whCauseId)) : undefined,
    whCauseName: 'whCauseName' in nokRcaData ? parseDescription(nokRcaData.whCauseName) : undefined,
    description: 'description' in nokRcaData ? parseDescription(nokRcaData.description) : undefined,
    improveSuggestion:
      'improveSuggestion' in nokRcaData ? parseDescription(nokRcaData.improveSuggestion) : undefined,
    createBy: 1,
    createAt: new Date(),
  };

  console.log('NOk RCA Processing Finish Successfully!');

  return newRcaData;
};
export { nokRcaProcessor };
