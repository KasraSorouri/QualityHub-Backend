import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db';

class ProductGrp extends Model<InferAttributes<ProductGrp>, InferCreationAttributes<ProductGrp>> {
  declare id?: number;
  declare groupName: string;
  declare groupCode: string;
  declare active: boolean;
}

ProductGrp.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    groupName: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    groupCode: {
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
    modelName: 'productGrp',
    sequelize,
  },
);

export default ProductGrp;
