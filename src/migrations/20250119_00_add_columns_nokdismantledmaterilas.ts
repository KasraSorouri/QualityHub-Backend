import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface } : any) => {
    await queryInterface.addColumn('nok_dismantle_materials','rw_dismantled_material_id', {
      type: DataTypes.INTEGER,
    })
  },
  down: async ({ context: queryInterface } : any) => {
    await queryInterface.removeColumn('nok_dismantle_materials','rw_dismantled_material_id');
  }
}