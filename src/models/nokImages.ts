import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db';

interface NokImageAttributes {
  id: number;
  nokId: number;
  fileName: string;
  filePath: string;
  fileSize: number;
  contentType: string;
  qualityStatus?: 'NOK' | 'OK';
  nokCodeId?: number;
  stationId?: number;
  uploadedBy: number;
  createdAt: Date;
  updatedAt: Date;
}

interface NokImageCreationAttributes extends Omit<NokImageAttributes, 'id'> {}

class NokImage extends Model<NokImageAttributes, NokImageCreationAttributes> implements NokImageAttributes {
  declare id: number;
  declare nokId: number;
  declare fileName: string;
  declare filePath: string;
  declare fileSize: number;
  declare contentType: string;
  declare qualityStatus?: 'NOK' | 'OK';
  declare nokCodeId?: number;
  declare stationId?: number;
  declare uploadedBy: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

NokImage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nokId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contentType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qualityStatus: {
      type: DataTypes.ENUM('OK', 'NOK'),
    },
    nokCodeId: {
      type: DataTypes.INTEGER,
    },
    stationId: {
      type: DataTypes.INTEGER,
    },
    uploadedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'nok_image',
  },
);

export default NokImage;
