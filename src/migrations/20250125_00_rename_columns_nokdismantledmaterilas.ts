import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface }: any) => {
    await queryInterface.removeColumn('nok_dismantle_materials', 'qty');
    await queryInterface.addColumn('nok_dismantle_materials', 'actual_dismantled_qty', {
      type: DataTypes.INTEGER,
    });
  },
  down: async ({ context: queryInterface }: any) => {
    await queryInterface.removeColumn('nok_dismantle_materials', 'actual_dismantled_qty');
    await queryInterface.addColumn('nok_dismantle_materials', 'qty', {
      type: DataTypes.INTEGER,
    });
  },
};
