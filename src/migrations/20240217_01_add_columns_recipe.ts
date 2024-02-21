import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface } : any) => {
    await queryInterface.addColumn('nok_analyses','time_waste', {
      type: DataTypes.INTEGER,
    }),
    await queryInterface.addColumn('nok_analyses', 'material_waste', {
      type: DataTypes.DECIMAL,
    })
  },
  down: async ({ context: queryInterface } : any) => {
    await queryInterface.removeColumn('nok_analyses', 'time_waste');
    await queryInterface.removeColumn('nok_analyses', 'material_waste');
  }
}