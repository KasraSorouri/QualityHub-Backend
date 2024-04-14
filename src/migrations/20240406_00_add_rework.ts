import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface } : any) => {
    await queryInterface.createTable('reworks', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      product_id: {
        type: DataTypes.INTEGER,
        References: { model: 'products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      nok_code_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        References: { model: 'nok_codes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',       
      },
      station_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        References: { model: 'stations', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      rework_short_desc: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING
      },
      order: {
        type: DataTypes.INTEGER
      },
      rework_recipes: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        References: { model: 'recipes', key: 'id' },
      },
      affected_recipes: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        References: { model: 'recipes', key: 'id' },
      },
      active: {
        type: DataTypes.BOOLEAN,
      },
      deprecated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      time_duration: {
        type: DataTypes.INTEGER
      },
      creation_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      deprecated_date: {
        type: DataTypes.DATE,
        allowNull: true,
      }
    })
  },
  down: async ({ context: queryInterface } : any) => {
    await queryInterface.dropTable('reworks')
  }
}