import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';

import { sequelize } from '../configs/db';

class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  id?: number;
  productName!: string;
  productCode!: string;
  active!: boolean;
  productGrpId!: number;

  static associate(models: any) {
    Product.belongsTo(models.ProductGrp, {
      foreignKey: 'productGrpId',
      as: 'productGrp'
    });
  }
}

// define Product Model
Product.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  productCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  active: {
    type: DataTypes.BOOLEAN
  },
  productGrpId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
},

{
  underscored: true,
  timestamps: false,
  modelName: 'product',
  sequelize,
});

export default Product;