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
  active: boolean;
}
export interface MaterialData extends Omit<Material,'id'> {};

export interface Recipe {
  id: number;
  recipeCode: string;
  description: string;
  order: number;
  product: Product;
  station: Station;
  active: boolean;
}

export interface RecipeData extends Omit<Recipe,'id' | 'product' | 'station'> {
  productId: number;
  stationId: number;
};