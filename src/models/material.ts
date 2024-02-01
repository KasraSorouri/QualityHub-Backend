import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';

import { sequelize } from '../configs/db';

class Material extends Model<InferAttributes<Material>, InferCreationAttributes<Material>> {
  id?: number;
  itemShortName!: string;
  itemLongName?: string;
  itemCode!: string;
  active!: boolean;
}

// define Product Model
Material.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  itemShortName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  itemLongName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  itemCode: {
    type: DataTypes.STRING,
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
  modelName: 'material',
  sequelize,
});

export default Material;