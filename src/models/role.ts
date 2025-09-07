import { Model, DataTypes, BelongsToManySetAssociationsMixin } from 'sequelize';
import { sequelize } from '../configs/db';
import { Right } from '../modules/usersAndAuthentication/types';

// define Role Model
class Role extends Model {
  public id!: number;
  public roleName!: string;
  public active!: boolean;
  public rights?: Right[];

  public setRights!: BelongsToManySetAssociationsMixin<Right, number>;

}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roleName: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    underscored: true,
    timestamps: false,
    modelName: 'role',
    sequelize,
  },
);

export default Role;
