import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface }: any) => {
    (await queryInterface.createTable('work_shifts', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      shift_name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      shift_code: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
      },
    }),
      await queryInterface.createTable('customers', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: false,
          unique: true,
        },
        customer_code: {
          type: DataTypes.TEXT,
          allowNull: false,
          unique: true,
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
          type: DataTypes.BOOLEAN,
        },
      }),
      await queryInterface.createTable('stations', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        station_name: {
          type: DataTypes.TEXT,
          allowNull: false,
          unique: true,
        },
        station_code: {
          type: DataTypes.TEXT,
          allowNull: false,
          unique: true,
        },
        description: {
          type: DataTypes.TEXT,
        },
        active: {
          type: DataTypes.BOOLEAN,
        },
      }));
  },
  down: async ({ context: queryInterface }: any) => {
    await queryInterface.dropTable('work_shifts');
    await queryInterface.dropTable('customers');
    await queryInterface.dropTable('stations');
  },
};
