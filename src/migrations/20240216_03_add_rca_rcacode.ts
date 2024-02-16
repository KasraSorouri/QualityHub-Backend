import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface } : any) => {
    await queryInterface.createTable('rca_codes', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      rca_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      rca_cesc: {
        type: DataTypes.STRING
      },
      active: {
        type: DataTypes.BOOLEAN
      },
    }),
    await queryInterface.createTable('rca', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      rca_code_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'rca_codes', key: 'id' },
        onUpdate: 'CASCADE',
      },
      nok_id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'nok_analyses', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      wh_cause_id: {
        type: DataTypes.INTEGER,
      },
      wh_cause_name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      improve_sugestion: {
        type: DataTypes.STRING,
      }
    })
  },
  down: async ({ context: queryInterface } : any) => {
    await queryInterface.dropTable('rca')
    await queryInterface.dropTable('rca_codes')
  }
}