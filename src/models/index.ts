import User from './user';
import Role from './role';
import Right from './right';
import UserRoles from './userRoles';
import RoleRights from './roleRights';

import Product from './product';
import ProductGrp from './productGrp';

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

Role.belongsToMany(User, { through: UserRoles, foreignKey: 'roleId' });
User.belongsToMany(Role, { through: UserRoles, foreignKey: 'userId' });

Right.belongsToMany(Role, { through: RoleRights, foreignKey: 'rightId' });
Role.belongsToMany(Right, { through: RoleRights, foreignKey: 'roleId' });

Product.belongsTo(ProductGrp, { foreignKey: 'productGrpId'});
ProductGrp.hasMany(Product, { foreignKey: 'productGrpId'});

export {
  User,
  Role,
  Right,
  UserRoles,
  RoleRights,
  Product,
  ProductGrp,
};