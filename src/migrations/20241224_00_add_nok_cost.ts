import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface } : any) => {
    await queryInterface.createTable('nok_costs', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nok_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'nok_detects', key: 'id' },
      },
      rework_id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        references: { model: 'nok_reworks', key: 'id' },
      },
      material_waste: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      time_waste: {
        type: DataTypes.DECIMAL,
      },
      edit_locked: {
        type: DataTypes.BOOLEAN,
        default: false,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      }
    })
  },
  down: async ({ context: queryInterface } : any) => {
    await queryInterface.dropTable('nok_costs')
  }
}