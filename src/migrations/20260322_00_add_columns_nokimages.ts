import { DataTypes, QueryInterface } from 'sequelize';

interface MigrationContext {
  context: QueryInterface;
}

module.exports = {
  up: async ({ context: queryInterface }: MigrationContext): Promise<void> => {
    await queryInterface.addColumn('nok_images', 'quality_status', {
      type: DataTypes.STRING,
    });
    await queryInterface.addColumn('nok_images', 'nok_code_id', {
      type: DataTypes.INTEGER,
    });
    await queryInterface.addColumn('nok_images', 'station_id', {
      type: DataTypes.INTEGER,
    });
  },
  down: async ({ context: queryInterface }: MigrationContext): Promise<void> => {
    await queryInterface.removeColumn('nok_images', 'quality_status');
    await queryInterface.removeColumn('nok_images', 'nok_code_id');
    await queryInterface.removeColumn('nok_images', 'station_id');
  },
};
