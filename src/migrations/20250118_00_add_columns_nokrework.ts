import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface } : any) => {
    await queryInterface.addColumn('nok_reworks','rework_station_id', {
      type: DataTypes.INTEGER,
    })
  },
  down: async ({ context: queryInterface } : any) => {
    await queryInterface.removeColumn('nok_reworks','rework_station_id');
  }
}