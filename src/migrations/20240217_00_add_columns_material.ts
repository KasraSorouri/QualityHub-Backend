import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface }: any) => {
    await queryInterface.addColumn('materials', 'traceable', {
      type: DataTypes.BOOLEAN,
    });
  },
  down: async ({ context: queryInterface }: any) => {
    await queryInterface.removeColumn('materials', 'traceable');
  },
};
