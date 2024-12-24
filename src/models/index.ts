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
import NokRework from './nokRework';
import NokDismantleMaterials from './nokDismantleMaterials';
import Rca from './rca';
import RcaCode from './rcaCode';
import Machine from './machine';
import ClassCode from './defectClass';
import RwDismantledMaterials from './reworkDismantledMaterials';
import NokRework_ReworkActions from './nokRework_ReworkActions';
import NokRework_AffectedRecipes from './nokRework_AffectedRecipes';
import NokCost from './nokCost';

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
  include:[{
    model: typeof Material;
    as: string;
    attributes: string[];
  }];
} 

export interface NokCodeQuery {
  attributes: {
    exclude: string[];
  };
  include: NokGrpInclude[];
}

export interface NokGrpInclude {
  model: typeof NokGrp;
  as: string,
  attributes: string[];
}

export interface RcaCodeQuery {
  attributes: {
    exclude: string[];
  };
}

export interface MachineQuery {
  attributes: {
    exclude: string[];
  };
  include: StationInclude[];
}

export interface StationInclude {
  model: typeof Station;
  as: string,
  attributes: string[];
}

export interface ClassCodeQuery {
  attributes: {
    exclude: string[];
  };
}

export interface NokDetectQuery {
  attributes: {
    exclude: string[];
  };
  include: Object[];
}

export interface ReworkQuery {
  attributes: {
    exclude: string[];
  };
  include: [RecipeProduct, RecipeStation, ReworkNokCode, RwDismantledMaterialsInclude]
}

export interface ReworkNokCode {
  model: typeof NokCode;
  as: string;
  attributes: string[];
}

interface RwDismantledMaterialsInclude {
  model: typeof RwDismantledMaterials;
  as: string;
  attributes: string[];
  include:[ReworkBomsInclude]
}

interface ReworkBomsInclude {
  model: typeof RecipeBoms;
  as: string;
  attributes: string[];
  include:[{
    model: typeof Material;
    as: string;
    attributes: string[];
  },{
    model: typeof Recipe;
    as: string;
    attributes: string[];
  }];
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
RecipeBoms.belongsTo(Recipe, { as: 'recipe', foreignKey: 'recipeId'});

Material.hasMany(RecipeBoms, { as: 'material', foreignKey: 'materialId'});
RecipeBoms.belongsTo(Material, { as: 'material', foreignKey: 'materialId'});

Machine.belongsTo(Station, { foreignKey: 'stationId'});
Station.hasMany(Machine, { foreignKey: 'stationId'});

Recipe.belongsToMany(Material, { through: RecipeBoms ,foreignKey: 'recipeId'});
Material.belongsToMany(Recipe, { through: RecipeBoms, foreignKey: 'materialId'});

// NOK Management
NokCode.belongsTo(NokGrp, { foreignKey: 'nokGrpId'});
NokGrp.hasMany(NokCode, { foreignKey: 'nokGrpId'});

NokDetect.belongsTo(NokCode, { foreignKey: 'initNokCodeId', as:'initNokCode'});
NokCode.hasMany(NokDetect, { foreignKey: 'initNokCodeId'});

NokDetect.belongsTo(Product, { foreignKey: 'productId'});
Product.hasMany(NokDetect, { foreignKey: 'productId'});

NokDetect.belongsTo(Station, { foreignKey: 'detectStationId', as:'detectedStation'});
Station.hasMany(NokDetect, { foreignKey: 'detectStationId'});

NokDetect.belongsTo(WorkShift, { foreignKey: 'detectShiftId', as: 'detectedShift'});
WorkShift.hasMany(NokDetect, { foreignKey: 'detectShiftId'});

NokDetect.hasOne(NokAnalyse,{ foreignKey:'nokId'});
NokAnalyse.belongsTo(NokDetect, { foreignKey: 'nokId'});

NokDetect.hasMany(NokRework,{ foreignKey:'nokId'})
NokRework.belongsTo(NokDetect, { foreignKey: 'nokId'});

NokDetect.hasMany(NokDismantleMaterials, { foreignKey: 'nokId'});
NokDismantleMaterials.belongsTo(NokDetect, { foreignKey: 'nokId'});
NokDismantleMaterials.belongsTo(Material, { foreignKey: 'materialId'});

NokAnalyse.belongsTo(Station, { foreignKey: 'stationId'});
NokAnalyse.belongsTo(Material, { foreignKey: 'materialId'});
NokAnalyse.belongsTo(WorkShift, { foreignKey: 'causeShiftId'});

Rca.belongsTo(NokAnalyse, { foreignKey: 'nokId'});
NokAnalyse.hasMany(Rca, { foreignKey: 'nokId'});

Rca.belongsTo(RcaCode, { foreignKey: 'rcaCodeId'});
RcaCode.hasMany(Rca, { foreignKey: 'rcaCodeId'});

Rework.belongsTo(Product, { foreignKey: 'productId'});
Product.hasMany(Rework, { foreignKey: 'productId'});

Rework.belongsTo(Station, { foreignKey: 'stationId'});
Station.hasMany(Rework, { foreignKey: 'stationId'});

Rework.belongsTo(NokCode, { foreignKey: 'nokCodeId'});
NokCode.hasMany(Rework, { foreignKey: 'nokCodeId'});

Rework.hasMany(RwDismantledMaterials, { foreignKey: 'reworkId'});
RwDismantledMaterials.belongsTo(Rework, { foreignKey: 'reworkId'});

RwDismantledMaterials.belongsTo(RecipeBoms, { foreignKey: 'recipeBomId'})
RecipeBoms.hasMany(RwDismantledMaterials, { foreignKey: 'recipeBomId'});

NokDismantleMaterials.belongsTo(NokRework, { foreignKey: 'reworkId' });
NokRework.hasMany(NokDismantleMaterials, { foreignKey: 'reworkId' });

NokRework.belongsToMany(Rework, { through: NokRework_ReworkActions , foreignKey:'nokReworkId' })
Rework.belongsToMany(NokRework, { through: NokRework_ReworkActions , foreignKey:'reworkActionId' })

NokRework.belongsToMany(Recipe, { through: NokRework_AffectedRecipes, foreignKey:'nokReworkId' });
Recipe.belongsToMany(NokRework, { through: NokRework_AffectedRecipes, foreignKey:'affectedRecipeId' });

NokCost.belongsTo(NokRework, { foreignKey: 'reworkId' });
NokRework.hasMany(NokCost, { foreignKey: 'reworkId' });

NokCost.belongsTo(NokDetect,{ foreignKey: 'nokId'});
NokDetect.hasMany(NokCost, { foreignKey: 'nokId' });

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
  NokRework,
  NokDismantleMaterials,
  RwDismantledMaterials,
  RcaCode,
  Rca,
  ClassCode,
  NokRework_ReworkActions,
  NokRework_AffectedRecipes,
  NokCost
};