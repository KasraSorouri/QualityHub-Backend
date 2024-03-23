import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface } : any) => {
    await queryInterface.addColumn('reworks','product_id', {
      type: DataTypes.INTEGER,
      References: { model: 'products', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
  },
  down: async ({ context: queryInterface } : any) => {
    await queryInterface.removeColumn('reworks','product_id');
  }
}