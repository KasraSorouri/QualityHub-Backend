import { Product, ProductData, ProductGrpData } from '../types';
import { isString, isBoolean, stringLengthCheck } from '../../../utils/dataValidator';

const parseProductName = (productName: unknown): string => {
  if (!isString(productName) || !stringLengthCheck(productName,3, 'productname')) {
    throw new Error('Incorrect productname!');
  }
  return productName;
};

const parseProductCode = (productCode: unknown): string => {
  if (!isString(productCode) || !stringLengthCheck(productCode,3, 'productname')) {
    throw new Error('Incorrect productname!');
  }
  return productCode;
};

const parseActive = (active: unknown): boolean => {
  if (!isBoolean(active)) {
    throw new Error('Incorrect or missing data!');
  }
  return active;
};

const productProcessor = async(productData: unknown): Promise<ProductData> => {
  if (!productData || typeof productData !== 'object') {
    throw new Error('Incorrect or missing Data!');
  }
  console.log('*** product data processor * productData ->', productData);
  
  if ('productName' in productData && 'productCode' in productData && 'productGrpId' in productData) {
    const newProduct: ProductData = {
      productName: parseProductName(productData.productName),
      productCode: parseProductCode(productData.productCode),
      active: 'active' in productData ? parseActive(productData.active) : true,
      productGrpId: 1,
  };
    return newProduct;
  } else {
    throw new Error('Data is missing');
  }
};

const productGrpProcessor = async(productGrpData: unknown): Promise<ProductGrpData> => {
  if (!productGrpData || typeof productGrpData !== 'object') {
    throw new Error('Incorrect or missing Data!');
  }
  if ('groupName' in productGrpData && 'groupCode' in productGrpData) {
    const newProductGrp: ProductGrpData = {
      groupName: parseProductName(productGrpData.groupName),
      groupCode: parseProductCode(productGrpData.groupCode),
      active: 'active' in productGrpData ? parseActive(productGrpData.active) : true,
  };
    return newProductGrp;
  } else {
    throw new Error('Data is missing');
  }
};
 
const parseProductResponse = (productData: Product): Product => {
  return ({
    id: productData.id,
    productName: productData.productName,
    productCode: productData.productCode,
    group: productData.group,
    active: productData.active,
  });
};

export {
  productProcessor,
  parseProductResponse,
  productGrpProcessor
};