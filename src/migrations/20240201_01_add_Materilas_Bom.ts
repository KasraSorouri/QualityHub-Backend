import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface } : any) => {
    await queryInterface.createTable('materials', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      item_short_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      item_long_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      item_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      active: {
        type: DataTypes.BOOLEAN
      },
    }),
    await queryInterface.createTable('product_station_boms', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'products', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      station_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'stations', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      station_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      material_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'materials', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }
    })
  },
  down: async ({ context: queryInterface } : any) => {
    await queryInterface.dropTable('product_station_boms')
    await queryInterface.dropTable('materials')
  }
}