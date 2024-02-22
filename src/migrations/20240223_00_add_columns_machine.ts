import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface } : any) => {
    await queryInterface.addColumn('machines','station_id', {
      type: DataTypes.INTEGER,
      References: { model: 'stations', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
  },
  down: async ({ context: queryInterface } : any) => {
    await queryInterface.removeColumn('machines', 'station_id');
  }
}