import User from './user';
import Role from './role';
import Right from './right';
import UserRoles from './userRoles';
import RoleRights from './roleRights';

import Product from './product';
import ProductGrp from './productGrp';
import Station from './station';
import Material from './material';
import Customer from './customer';
import WorkShift from './workShif';
import Recipe from './recipe';
import RecipeBoms from './recipeBoms';
import NokCode from './nokCode';
import NokGrp from './nokGrp';
import NokDetect from './nokDetect';
import NokAnalyse from './nokAnalyse';
import Rework from './rework';
import NokReworks from './nokReworks';
import DismantleMaterials from './nokDismantleMaterials';
import Rca from './rca';
import RcaCode from './rcaCode';
import Machine from './machine';

export interface UserQuery {
  attributes: {
    exclude: string[];
  };
  include: RoleInclude[];
}

export interface RoleQuery {
  attributes: {
    exclude: string[];
  };
  include: RightInclude[];
}

export interface RoleInclude {
  model: typeof Role;
  as: string;
  attributes: string[];
  through: {
    attributes: never[];
  };
  include: RightInclude[];
}

export interface RightInclude {
  model: typeof Right;
  as: string;
  attributes: string[];
  through: {
    attributes: never[];
  };
}

// Qualiy Hub Moduly
export interface ProductQuery {
  attributes: {
    exclude: string[];
  };
  include: ProductGrpInclude[];
}

export interface ProductGrpQuery {
  attributes: {
    exclude: string[];
  };
}

export interface ProductGrpInclude {
  model: typeof ProductGrp;
  as: string,
  attributes: string[];
}

export  interface StationQuery {
  attributes: {
    exclude: string[];
  };
}

export interface CustomerQuery {
  attributes: {
    exclude: string[];
  };
}

export interface WorkShiftQuery {
  attributes: {
    exclude: string[];
  };
}

export interface MaterialQuery {
  attributes: {
    exclude: string[];
  };
}

export interface RecipeQuery {
  attributes: {
    exclude: string[];
  };
  include: [RecipeProduct, RecipeStation, RecipeBomsInclude];
}

export interface RecipeProduct {
  model: typeof Product;
  as: string;
  attributes: string[];
}

export interface RecipeStation {
    model: typeof Station;
    as: string;
    attributes: string[];
}

interface RecipeBomsInclude {
  model: typeof RecipeBoms;
  as: string;
  attributes: string[];
  include: {
    model: typeof Material;
    as: string;
    attributes: string[];
  }[];
} 

Role.belongsToMany(User, { through: UserRoles, foreignKey: 'roleId' });
User.belongsToMany(Role, { through: UserRoles, foreignKey: 'userId' });

Right.belongsToMany(Role, { through: RoleRights, foreignKey: 'rightId' });
Role.belongsToMany(Right, { through: RoleRights, foreignKey: 'roleId' });

// Qualiy Hub Moduly
Product.belongsTo(ProductGrp, { foreignKey: 'productGrpId'});
ProductGrp.hasMany(Product, { foreignKey: 'productGrpId'});

Recipe.belongsTo(Product, { foreignKey: 'productId'});
Product.hasMany(Recipe, { foreignKey: 'productId'});

Recipe.belongsTo(Station, { foreignKey: 'stationId'});
Station.hasMany(Recipe, { foreignKey: 'stationId'});

Recipe.hasMany(RecipeBoms, { as:'recipeMaterials', foreignKey: 'recipeId'});

Material.hasMany(RecipeBoms, { as: 'material', foreignKey: 'materialId'});
RecipeBoms.belongsTo(Material, { as: 'material', foreignKey: 'materialId'});

Recipe.belongsToMany(Material, { through: RecipeBoms  ,foreignKey: 'recipeId'});
Material.belongsToMany(Recipe, { through: RecipeBoms, foreignKey: 'materialId'});

// NOK Management
NokCode.belongsTo(NokGrp, { foreignKey: 'nokGrpId'});
NokGrp.hasMany(NokCode, { foreignKey: 'nokGrpId'});

NokDetect.hasOne(NokAnalyse,{ foreignKey:'nokId'});
NokAnalyse.belongsTo(NokDetect, { foreignKey: 'nokId'});

NokDetect.hasMany(NokReworks,{ foreignKey:'nokId'})
NokReworks.belongsTo(NokDetect, { foreignKey: 'nokId'});

NokDetect.hasMany(DismantleMaterials, { foreignKey: 'nokId'});
DismantleMaterials.belongsTo(NokDetect, { foreignKey: 'nokId'});
DismantleMaterials.belongsTo(Material, { foreignKey: 'materialId'});

NokAnalyse.belongsTo(Station, { foreignKey: 'stationId'});
NokAnalyse.belongsTo(Material, { foreignKey: 'materialId'});
NokAnalyse.belongsTo(WorkShift, { foreignKey: 'causeShiftId'});

Rca.belongsTo(NokAnalyse, { foreignKey: 'nokId'});
NokAnalyse.hasMany(Rca, { foreignKey: 'nokId'});

Rca.belongsTo(RcaCode, { foreignKey: 'rcaCodeId'});
RcaCode.hasMany(Rca, { foreignKey: 'rcaCodeId'});

export {
  User,
  Role,
  Right,
  UserRoles,
  RoleRights,
  Product,
  ProductGrp,
  WorkShift,
  Station,
  Customer,
  Material,
  Recipe,
  RecipeBoms,
  Machine,
  Rework,
  NokGrp,
  NokCode,
  NokDetect,
  NokAnalyse,
  NokReworks,
  DismantleMaterials,
  RcaCode,
  Rca,
};