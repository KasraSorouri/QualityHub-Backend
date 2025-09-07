import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface }: any) => {
    await queryInterface.createTable('class_codes', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      class_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      class_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      class_desc: {
        type: DataTypes.STRING,
      },
      active: {
        type: DataTypes.BOOLEAN,
      },
    });
  },
  down: async ({ context: queryInterface }: any) => {
    await queryInterface.dropTable('class_codes');
  },
};
