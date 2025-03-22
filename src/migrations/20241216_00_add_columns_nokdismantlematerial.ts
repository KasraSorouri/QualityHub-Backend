import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface } : any) => {
    await queryInterface.addColumn('nok_dismantle_materials','unit_price', {
      type: DataTypes.DECIMAL,
      defaultValue: 0
    })
  },
  down: async ({ context: queryInterface } : any) => {
    await queryInterface.removeColumn('nok_dismantle_materials','unit_price');
  }
}