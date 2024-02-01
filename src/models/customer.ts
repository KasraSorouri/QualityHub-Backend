import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db';

class Customer extends Model<InferAttributes<Customer>, InferCreationAttributes<Customer>> {
  id?: number;
  name!: string;
  customerCode!: string;
  email?: string;
  phone?: string;
  address?: string;
  active!: boolean;
}

Customer.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  customerCode: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  phone: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN
  },
}, 
{
  underscored: true,
  timestamps: false,
  modelName: 'customer',
  sequelize,
});

export default Customer;