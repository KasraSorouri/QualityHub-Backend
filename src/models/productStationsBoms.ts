import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../configs/db';

class ProductStationsBoms extends Model {
  public id!: number;
  public productId!: number;
  public StationId!: number;
  public bomId?: number;
  public qty?: number;
}

ProductStationsBoms.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'products', key: 'id' }
  },
  StationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'stations', key: 'id' }
  },
  stationOrder : {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bomId: {
    type: DataTypes.INTEGER,   allowNull: true,
    references: { model: 'boms', key: 'id' }
  },
  qty: {
    type: DataTypes.INTEGER,
    allowNull:true
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'productStationsBoms'
});

export default ProductStationsBoms;