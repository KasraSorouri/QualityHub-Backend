import { Model, DataTypes } from 'sequelize';
import {sequelize} from '../configs/db';
import {Right} from '../modules/usersAndAuthentication/types';

/*
interface RoleAttributes {
  id: number;
  roleName: string;
  active: boolean;
  rights?: Right[];
}
*/
//interface RoleCreationAttributes extends Optional<RoleAttributes, 'id'> {}
//export interface RoleInstance extends Model<RoleAttributes, RoleCreationAttributes>, RoleAttributes {}

// define Role Model
class Role extends Model {
  [x: string]: any;
  public id!: number;
  public roleName!: string;
  public active!: boolean;
  public rights?: Right[];
}

Role.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  roleName: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  active: {
    type: DataTypes.BOOLEAN
  },
}, 
{
  underscored: true,
  timestamps: false,
  modelName: 'role',
  sequelize,
});

export default Role;