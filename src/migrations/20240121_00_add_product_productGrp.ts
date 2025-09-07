import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface }: any) => {
    await queryInterface.createTable('product_grps', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      group_name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      group_code: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
      },
    });
    await queryInterface.createTable('products', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      product_code: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
      },
      product_grp_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  },

  down: async ({ context: queryInterface }: any) => {
    await queryInterface.dropTable('products');
    await queryInterface.dropTable('product_grps');
  },
};
