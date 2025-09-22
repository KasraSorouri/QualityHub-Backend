import { parseBoolean, parseId } from '../../../utils/dataValidator';
import { NewAnalyseData, NokStatus } from '../types';
import { parseDescription } from './dataProcessor';

type analyseStatusData = {
  analyseStatus: NokStatus;
  removeFromReportStatus: boolean;
};

const nokAnalyseDataProcessor = (nokData: unknown): NewAnalyseData => {
  if (!nokData || typeof nokData !== 'object') {
    throw new Error('Incorrect or missing Data!');
  }
  if (
    'nokId' in nokData &&
    'nokCodeId' in nokData &&
    'causeStationId' in nokData &&
    'causeShiftId' in nokData &&
    'classCodeId' in nokData
  ) {
    const nokDataToReturn: NewAnalyseData = {
      nokId: parseId(nokData.nokId),
      nokCodeId: parseId(nokData.nokCodeId),
      causeStationId: parseId(nokData.causeStationId),
      causeShiftId: parseId(nokData.causeShiftId),
      classCodeId: parseId(nokData.classCodeId),
      description: 'description' in nokData ? parseDescription(nokData.description) : '',
      updatedBy: 1,
      updatedAt: new Date(),
      closed: 'closed' in nokData ? parseBoolean(nokData.closed) : false,
    };
    if (nokDataToReturn.closed) {
      nokDataToReturn.closeDate = new Date();
    }
    if ('id' in nokData && nokData.id) {
      nokDataToReturn.id = parseId(nokData.id);
    }

    return nokDataToReturn;
  } else {
    throw new Error('Incorrect or missing data!');
  }
};

const statusProcessor = (analyseStatusData: unknown): NokStatus => {
  switch (analyseStatusData) {
    case 'ANALYSED':
      return NokStatus.ANALYSED;

    case 'NEED INVESTIGATION':
      return NokStatus.NEED_INVESTIGATION;

    case 'NOT FOUND':
      return NokStatus.NOT_FOUND;

    default:
      return NokStatus.PENDING;
  }
};

// Analyse Status processor
const analyaseStatusProcessor = (analyseStatusData: unknown): analyseStatusData => {
  if (!analyseStatusData || typeof analyseStatusData !== 'object') {
    throw new Error('Incorrect or missing Data!');
  }

  if ('analyseStatus' in analyseStatusData && 'removeFromReportStatus' in analyseStatusData) {
    return {
      analyseStatus: statusProcessor(analyseStatusData.analyseStatus),
      removeFromReportStatus: parseBoolean(analyseStatusData.removeFromReportStatus),
    };
  } else {
    throw new Error('Incorrect or missing Data in analyse Status!');
  }
};

export { nokAnalyseDataProcessor, analyaseStatusProcessor };
