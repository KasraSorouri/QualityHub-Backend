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

