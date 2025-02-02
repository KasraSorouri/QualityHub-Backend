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
      },
      item_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      price: {
        type: DataTypes.DECIMAL
      },
      unit: {
        type: DataTypes.STRING
      },
      active: {
        type: DataTypes.BOOLEAN
      },
    }),
    await queryInterface.createTable('recipes', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      recipe_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.STRING,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'products', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',      
      },
      station_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'stations', key: 'id' }
      },
      time_duration: {
        type: DataTypes.INTEGER
      },
      manpower: {
        type: DataTypes.INTEGER,
      },
      recipe_type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'PRODUCTION'
      }
    })
    await queryInterface.createTable('recipe_boms', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      qty: {
        type: DataTypes.INTEGER,
      },
      recipe_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'recipes', key: 'id' }
      },
      material_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'materials', key: 'id' }
      },
      reusable: {
        type: DataTypes.ENUM('YES', 'NO', 'IQC')
      }
    })
  },
  down: async ({ context: queryInterface } : any) => {
    await queryInterface.dropTable('recipe_boms')
    await queryInterface.dropTable('recipes')
    await queryInterface.dropTable('materials')
  }
}