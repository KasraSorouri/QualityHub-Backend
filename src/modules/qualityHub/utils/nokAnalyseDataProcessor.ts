import { parseBoolean, parseId } from '../../../utils/dataValidator';
import { NewAnalyseData } from '../types';
import { parseDescription } from './dataProcessor';


const nokAnalyseDataProcessor = (nokData: unknown) : NewAnalyseData => {
  if (!nokData || typeof nokData !== 'object') {
    throw new Error('Incorrect or missing Data **!');
  }
  if ( 'nokId' in nokData &&
    'nokCodeId' in nokData &&
    'causeStationId' in nokData &&
    'causeShiftId' in nokData &&
    'classCodeId' in nokData
    ) {
      const nokDataToReturn : NewAnalyseData = {
        nokId: parseId(nokData.nokId),
        nokCodeId: parseId(nokData.nokCodeId),
        causeStationId: parseId(nokData.causeStationId),
        causeShiftId: parseId(nokData.causeShiftId),
        classCodeId: parseId(nokData.classCodeId),
        description: 'description' in nokData ? parseDescription(nokData.description) : '',
        updatedBy: 1,
        updatedAt: new Date(),
        closed: 'closeNok' in nokData? parseBoolean(nokData.closeNok) : false,
      }
      if (nokDataToReturn.closed) {
        nokDataToReturn.closeDate = new Date();
      }
      if ('id' in nokData && nokData.id) {
        nokDataToReturn.id = parseId(nokData.id)
      }

    return nokDataToReturn

  } else {
    console.log('Incorrect or missing data --+-+!');
    throw new Error('Incorrect or missing data --+-+!');
  }
}

export {
  nokAnalyseDataProcessor,
}