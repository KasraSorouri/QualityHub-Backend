import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db';

interface ClaimAttributes {
  id: number;
  dismantledMaterialId: number;
  date: Date;
  referenceType?: string;
  reference?: string;
  description?: string
}


interface ClaimCreationAttributes extends Omit<ClaimAttributes, 'id'> {}

class Claim extends Model<ClaimAttributes, ClaimCreationAttributes> implements ClaimAttributes {
  id!: number;
  dismantledMaterialId!: number;
  date!: Date;
  referenceType?: string;
  reference?: string;
  description?: string
}   

Claim.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dismantledMaterialId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  referenceType: {
    type: DataTypes.STRING,
  },
  reference: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'claim'
});

export default Claim;