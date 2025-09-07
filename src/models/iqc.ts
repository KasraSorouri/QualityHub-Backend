import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db';

interface IqcAttributes {
  id: number;
  dismantledMaterialId: number;
  date: Date;
  reference?: string;
  description?: string;
}

interface IqcCreationAttributes extends Omit<IqcAttributes, 'id'> {}

class Iqc extends Model<IqcAttributes, IqcCreationAttributes> implements IqcAttributes {
  id!: number;
  dismantledMaterialId!: number;
  date!: Date;
  reference?: string;
  description?: string;
}

Iqc.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    reference: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'iqc',
  },
);

export default Iqc;
