import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface } : any) => {
    await queryInterface.createTable('rw_dismantled_materials', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      rework_id: {
        type: DataTypes.INTEGER,
        references: { model: 'reworks', key: 'id' }
      },
      recipe_bom_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'recipe_boms', key: 'id' }
      },
      /*
      recipe_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'recipes', key: 'id' }
      },
      material_id: {
        type: DataTypes.INTEGER,
        references: { model: 'materials', key: 'id' }
      },
      */
      dismantled_qty: {
        type: DataTypes.INTEGER,
        allowNull:true
      },
      note: {
        type: DataTypes.STRING,
      },
      mandatory_remove: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    })
  },
  down: async ({ context: queryInterface } : any) => {
    await queryInterface.dropTable('rw_dismantled_materials')
  }
}