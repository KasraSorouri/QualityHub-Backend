import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';

import { sequelize } from '../configs/db';

class Material extends Model<InferAttributes<Material>, InferCreationAttributes<Material>> {
  declare id?: number;
  declare itemShortName: string;
  declare itemLongName?: string;
  declare itemCode: string;
  declare price?: number;
  declare unit?: string;
  declare traceable?: boolean;
  declare active: boolean;
  /*
    static associate(models: any) {
        Material.belongsToMany(models.Recipe, {
            through: models.RecipeBoms,
            foreignKey: 'materialId',
            as: 'recipes'
        });
    } 
*/
}

// define Product Model
Material.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    itemShortName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    itemLongName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    itemCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.DECIMAL,
    },
    unit: {
      type: DataTypes.STRING,
    },
    traceable: {
      type: DataTypes.BOOLEAN,
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
  },

  {
    underscored: true,
    timestamps: false,
    modelName: 'material',
    sequelize,
  },
);

export default Material;
