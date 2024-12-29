import { NokDetect } from "../../models";

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
  NO =  'NO', 
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
  REWORK_INPROGRESS = 'REWORK IN PROGRESS',
  REWORKED = 'REWORKED',
  SCRAPPED = 'SCRAPPED',
}

export enum MaterialStatus {
  OK = 'OK',
  SCRAPPED = 'SCRAPPED',
  IQC =  'IQC',
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

export interface RcaCode {
  id: number;
  rcaCode: string;
  rcaDesc: string;
  active: boolean;
}

export interface RcaCodeData extends Omit<RcaCode, 'id'> {
  id?: number;
}

export interface Machine {
  id: number;
  machineName: string;
  machineCode: string;
  description?: string;
  station?: Station;
  active: boolean;
}

export interface MachineData extends Omit<Machine, 'id' | 'station'> {
  id?: number;
  stationId?: number;
}

export interface ClassCode {
  id: number;
  className: string;
  classCode: string;
  classDesc: string;
  active: boolean;
}

export interface ClassCodeData extends Omit<ClassCode, 'id'> {
  id?: number;
}

export interface NOK {
  id: number;
  product: Product;
  productSN: string;
  initNokCode: NokCode;
  description?: string;
  detectedStation: Station;
  detectedShift: WorkShift;
  detectTime: Date;
  nokStatus: NokStatus;
  productStatus: ProductStatus;
  removeReport: boolean;
}

export interface NewNokData extends Omit<NOK, 'id' | 'product' | 'initNokCode' | 'detectedStation' | 'detectedShift'> {
  id?: number;
  productId: number;
  initNokCodeId: number;
  detectStationId: number;
  detectShiftId: number;
}

export interface RwDismantledMaterial {
  id: number;
  reworkId: number;
  recipeBomId: number;
  dismantledQty: number;
  note?: string;
  mandatoryRemove: boolean;
}

export interface RwDismantledMaterialData extends Omit<RwDismantledMaterial, 'id' | 'material' | 'recipe'> {
  id?: number;
  //recipeId?: number;
  //materialId: number;
}

export interface NewRwDismantledMaterialData extends Omit<RwDismantledMaterialData, 'reworkId'> {}

export interface Rework {
  id: number;
  product: Product;
  nokCode: NokCode;
  station: Station;
  reworkShortDesc: string;
  description: string;
  order: number;
  timeDuration?: number;
  active: boolean;
  deprecated: boolean;
  reworkRecipes?: Recipe[];
  affectedRecipes?: Recipe[];
  creationDate: Date;
  deprecatedDate?: Date;
  rwDismantledMaterials?: RwDismantledMaterial[];
}

export interface NewReworkData extends Omit<Rework, 'id' | 'product' | 'nokCode' | 'station' | 'reworkRecipes' | 'affectedRecipes' | 'dismantledMaterials'> {
  id?: number;
  productId: number;
  nokCodeId: number;
  stationId: number;
  reworkRecipes?: number[];
  affectedRecipes?: number[];
  dismantledMaterials?: NewRwDismantledMaterialData[];
}

export enum ReworkStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  POSTPONED = 'POSTPONED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface DismantledMaterial {
  id: number;
  material: Material;
  qty: number;
  recipeBom: RecipeBom | 'EXTERNAL';
}

export interface DismantledMaterialData {
  material: number;
  dismantledQty: number;
  recipeBomId: number | undefined;
  reusable: Reusable;
  materialStatus: MaterialStatus;
}

export interface NokRework {
  id: number;
  nok: NOK;
  reworkActions?: Rework[];
  dismantledMaterials?: DismantledMaterial[];
  AffectedRecipes?: Recipe[];
  reworkOperator: string;
  reworkTime: Date;
  reworkShift: WorkShift;
  reworkDuration: number;
  reworkManPower: number;
  reworkStation?: Station;
  reworkStatus: ReworkStatus;
  reworkNote: string;
  usedMaterialCost?: number;
  dismantledMaterialCost?: number;
  recipesWastedTime?: number;
}

export interface NokReworkData extends Omit<NokRework, 'id' | 'nok' | 'reworkActions' | 'dismantledMaterials' | 'AffectedRecipes' | 'reworkShift' | 'reworkStation'> {
  nokId: number;
  reworkActionsId?: number[];
  dismantledMaterials?: DismantledMaterialData[];
  affectedRecipes?: number[];
  reworkShiftId: number;
  reworkStationId?: number;
}

export interface MaterialCost {
  materialId: number;
  unitPrice: number;
}

export interface NokCost {
  nok: NokDetect;
  rework: NokRework;
  dismantledMaterial : MaterialCost[];
}

export interface NokCostData extends Omit<NokCost, 'nok' | 'rework'> {
  nokId: number;
  reworkId: number;
}

export interface NewNokCostsData extends NokCostData {
}

export interface NokRcaData {
  id: number;
  nokId: number;
  rcaCodeId: number;
  whCauseId?: number;
  whCauseName?: string;
  description?: string;
  improveSuggestion?: string;
  createBy: number;
  createAt: Date;
}

export interface NewNokRcaData extends Omit<NokRcaData, 'id'> {
  id?: number; 
}