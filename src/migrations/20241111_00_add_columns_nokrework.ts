import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface } : any) => {
    await queryInterface.addColumn('nok_reworks','lock_edit', {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    })
    await queryInterface.addColumn('nok_reworks','used_material_cost', {
      type: DataTypes.INTEGER,
      defaultValue: 0
    })
    await queryInterface.addColumn('nok_reworks','dismantled_material_cost', {
      type: DataTypes.INTEGER,
      defaultValue: 0
    })
    await queryInterface.addColumn('nok_reworks','recipes_wasted_time', {
      type: DataTypes.INTEGER,
      defaultValue: 0
    })

  },
  down: async ({ context: queryInterface } : any) => {
    await queryInterface.removeColumn('nok_reworks', 'lock_edit');
    await queryInterface.removeColumn('nok_reworks', 'used_material_cost');
    await queryInterface.removeColumn('nok_reworks', 'dismantled_material_cost');
    await queryInterface.removeColumn('nok_reworks', 'recipes_wasted_time');
  }
}