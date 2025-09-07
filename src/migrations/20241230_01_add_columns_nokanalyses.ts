import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface }: any) => {
    await queryInterface.addColumn('nok_analyses', 'class_code_id', {
      type: DataTypes.INTEGER,
    });
  },
  down: async ({ context: queryInterface }: any) => {
    await queryInterface.removeColumn('nok_analyses', 'class_code_id');
  },
};
