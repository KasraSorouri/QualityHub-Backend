import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../configs/db';
import Role from './role';
import Right from './right';

class RoleRights extends Model {
  public roleId!: number;
  public rightId!: number;
}

RoleRights.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Role , key: 'id' },
    },
    rightId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Right , key: 'id' },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'roleRights',
  },
);

export default RoleRights;
