import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface } : any) => {
    await queryInterface.createTable('machines', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      machine_name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
      },
      machine_code: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.TEXT,
      },
      active: {
        type: DataTypes.BOOLEAN
      },
    })
  },
  down: async ({ context: queryInterface } : any) => {
    await queryInterface.dropTable('machines')
  }
}