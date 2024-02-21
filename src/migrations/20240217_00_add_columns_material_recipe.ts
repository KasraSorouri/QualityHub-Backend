import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface } : any) => {
    await queryInterface.addColumn('materials','traceable', {
      type: DataTypes.BOOLEAN,
    }),
    await queryInterface.addColumn('recipes', 'recipe_type', {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'PRODUCTION'
    })
    await queryInterface.addColumn('recipes', 'manpower', {
      type: DataTypes.INTEGER,
    })
  },
  down: async ({ context: queryInterface } : any) => {
    await queryInterface.removeColumn('materials', 'traceable')
    await queryInterface.removeColumn('recipes', 'recipe_type')
    await queryInterface.removeColumn('recipes', 'manpower')
  }
}