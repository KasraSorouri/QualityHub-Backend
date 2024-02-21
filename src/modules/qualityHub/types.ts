export interface Product {
  id: number;
  productName: string;
  productCode: string;
  active: boolean;
  group: ProductGroup;
}

export interface ProductGroup {
  id: number;
  groupName: string;
  groupCode: string;
  active: boolean;
}

export interface ProductData extends Omit<Product,'id' | 'group'> {
  productGrpId: number;
};

export interface ProductGrpData extends Omit<ProductGroup,'id'> {};

export interface WorkShift {
  id: number;
  shiftName: string;
  shiftCode: string;
  active: boolean;
}

export interface WorkShiftData extends Omit<WorkShift,'id'> {};

export interface Station {
  id: number;
  stationName: string;
  stationCode: string;
  active: boolean;
}

export interface StationData extends Omit<Station,'id'> {};

export interface Material {
  id: number;
  itemShortName: string;
  itemLongName: string;
  itemCode: string;
  price?: number;
  unit?: string;
  active: boolean;
  traceable: boolean;
}
export interface MaterialData extends Omit<Material,'id'> {};

export interface Recipe {
  id: number;
  recipeCode: string;
  description: string;
  order: number;
  product: Product;
  station: Station;
  timeDuration?: number;
  manpower?: number;
  active: boolean;
  materials?: Material[];
  recipeType: RecipeType;
}

export interface ConsumingMaterial {
  materialId: number;
  qty: number;
  reusable?: Reusable;
}

export interface RecipeData extends Omit<Recipe,'id' | 'product' | 'station' | 'material'> {
  productId: number;
  stationId: number;
  materialsData: ConsumingMaterial[];
};

export interface RecipeBom {
  id: number;
  recipeId: number;
  materialId: number;
  qty: number;
  reusable: Reusable;
}

export interface RecipeBomData extends Omit<RecipeBom,'id'> {};

export enum Reusable  {
  YES = 'YES',
  No =  'NO', 
  IQC = 'IQC'
}

export enum NokStatus {
  PENDING = 'PENDING',
  ANALYSED = 'ANALYSED',
  NEED_INVESTIGATION = 'NEED INVESTIGATION',
  NOT_FOUND = 'NOT FOUND'
}

export enum ProductStatus {
  NOK = 'NOK',
  REWORKED = 'REWORKED',
  SCRAPPED = 'SCRAPPED',
}

export enum MaterialStatus {
  OK = 'OK',
  SCRAPPED = 'SCRAPPED',
  CLAIMABLE = 'CLAIMABLE',
}

export enum ClaimStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DENIED = 'DENIED',
}

export enum RecipeType {
  PRODUCTION = 'PRODUCTION',
  REWORK = 'REWORK',
}

export interface NokGroup {
  id: number;
  nokGrpName: string;
  nokGrpCode: string;  
  nokGrpDesc?: string;
  active: boolean;
}

export interface NokGrpData extends Omit<NokGroup, 'id'> {
  id? : number;
}

export interface NokCode {
  id: number;
  nokCode: string;
  nokDesc: string;
  nokGrp: NokGroup;
  active: boolean;
}

export interface NokCodeData extends Omit<NokCode, 'id' | 'nokGrp'> {
  id?: number;
  nokGrpId: number;
}