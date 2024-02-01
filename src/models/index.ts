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
import ProductStationsBoms from './productStationsBoms';

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


Role.belongsToMany(User, { through: UserRoles, foreignKey: 'roleId' });
User.belongsToMany(Role, { through: UserRoles, foreignKey: 'userId' });

Right.belongsToMany(Role, { through: RoleRights, foreignKey: 'rightId' });
Role.belongsToMany(Right, { through: RoleRights, foreignKey: 'roleId' });

// Qualiy Hub Moduly
Product.belongsTo(ProductGrp, { foreignKey: 'productGrpId'});
ProductGrp.hasMany(Product, { foreignKey: 'productGrpId'});

Product.belongsToMany(Station, { through: ProductStationsBoms, foreignKey: 'productId'});
Station.belongsToMany(Product, { through: ProductStationsBoms, foreignKey: 'stationId'});

Product.belongsToMany(Material, { through: ProductStationsBoms, foreignKey: 'productId'});
Material.belongsToMany(Product, { through: ProductStationsBoms, foreignKey: 'bomId'});


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
  ProductStationsBoms
};