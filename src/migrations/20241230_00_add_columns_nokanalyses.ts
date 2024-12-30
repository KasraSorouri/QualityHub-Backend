import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface } : any) => {
    await queryInterface.addColumn('nok_analyses','updated_by', {
      type: DataTypes.INTEGER,
    }),
    await queryInterface.addColumn('nok_analyses','updated_at', {
      type: DataTypes.DATE,
    })
  },
  down: async ({ context: queryInterface } : any) => {
    await queryInterface.removeColumn('nok_analyses','updated_by');
    await queryInterface.removeColumn('nok_analyses','updated_at');
  }
}