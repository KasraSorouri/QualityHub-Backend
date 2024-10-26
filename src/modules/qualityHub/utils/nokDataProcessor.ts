import { isString, parseId, parseDate, parseBoolean } from '../../../utils/dataValidator';
import { NewNokData, NokStatus, ProductStatus } from '../types';
import { parseDescription } from './dataProcessor';


const parseProductSN = (productSN: unknown) : string => {
  if (!productSN || !isString(productSN)) {
    throw new Error('Incorrect or missing productSN!');
  }
  return productSN;
}

const parseNokStatus = (nokStatus: unknown) : NokStatus => {
  if (!isString(nokStatus)) {
    throw new Error('Incorrect or missing data!');
  }
  switch(nokStatus) {
    case 'PENDING':
      return NokStatus.PENDING;
    case 'ANALYSED':
      return NokStatus.ANALYSED;
    case 'NEED INVESTIGATION':
      return NokStatus.NEED_INVESTIGATION;
    case 'NOT FOUND':
      return NokStatus.NOT_FOUND;
    default:
      throw new Error('Incorrect or missing data ++!');
  }
}

const parseProductStatus = (productStatus: unknown) : ProductStatus => {
  if (!isString(productStatus)) {
    throw new Error('Incorrect or missing data!');
  }
  switch(productStatus) {
    case 'NOK':
      return ProductStatus.NOK;
    case 'REWORKED':
      return ProductStatus.REWORKED;
    case 'SCRAPPED':
      return ProductStatus.SCRAPPED;
    default:
      throw new Error('Incorrect or missing data! ---');
  }
}



const nokDataProcessor = (nokData: unknown) : NewNokData => {
  if (!nokData || typeof nokData !== 'object') {
    throw new Error('Incorrect or missing Data **!');
  }
  if ( 'productId'  in nokData &&
    'productSN' in nokData &&
    'detectStationId' in nokData &&
    'detectShiftId' in nokData &&
    'initNokCodeId' in nokData &&
    'detectedTime' in nokData &&
    'nokStatus' in nokData &&
    'productStatus' in nokData &&
    'removeReport' in nokData ) {
      const nokDataToReturn : NewNokData = {
        productId: parseId(nokData.productId),
        productSN: parseProductSN(nokData.productSN),
        detectStationId: parseId(nokData.detectStationId),
        detectShiftId: parseId(nokData.detectShiftId),
        initNokCodeId: parseId(nokData.initNokCodeId),
        detectTime: parseDate(nokData.detectedTime),
        nokStatus: parseNokStatus(nokData.nokStatus),
        productStatus: parseProductStatus(nokData.productStatus),
        removeReport: parseBoolean(nokData.removeReport),
        description: 'description' in nokData ? parseDescription(nokData.description) : ''
      }
      return nokDataToReturn
    } else {
      console.log('Incorrect or missing data --+-+!');
      throw new Error('Incorrect or missing data --+-+!');
    }
  }

export {
  nokDataProcessor
}