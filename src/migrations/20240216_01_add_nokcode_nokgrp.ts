import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface } : any) => {
    await queryInterface.createTable('nok_grps', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nok_grp_name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
      },
      nok_grp_code: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
      },
      nok_grp_desc: {
        type: DataTypes.TEXT
      },
      active: {
        type: DataTypes.BOOLEAN
      },
    }),
    await queryInterface.createTable('nok_codes', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nok_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      nok_desc: {
        type: DataTypes.STRING,
      },
      active: {
        type: DataTypes.BOOLEAN
      },
      nok_grp_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'nok_grps', key: 'id' },
      }
    })
  },
  down: async ({ context: queryInterface } : any) => {
    await queryInterface.dropTable('nok_grps')
    await queryInterface.dropTable('nok_codes')
  }
}