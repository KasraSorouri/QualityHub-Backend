import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface }: { context: QueryInterface }): Promise<void> => {
    await queryInterface.createTable('nok_images', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nok_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      file_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      file_path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      file_size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      uploaded_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  down: async ({ context: queryInterface }: { context: QueryInterface }): Promise<void> => {
    await queryInterface.dropTable('nok_images');
  },
};
