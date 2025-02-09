import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface } : any) => {
    await queryInterface.createTable('iqcs', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      dismantled_material_id: {
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
      }
    })
  },
  down: async ({ context: queryInterface } : any) => {
    await queryInterface.dropTable('iqcs')
  }
}