import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface } : any) => {
    await queryInterface.createTable('nok_detects', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'products', key: 'id' },
      },
      product_s_n: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      init_nok_code_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'nok_codes', key: 'id' },
      },
      detect_station_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'stations', key: 'id' },
      },
      detect_shift_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'work_shifts', key: 'id' },
      },
      detect_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      nok_status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'PENDING'
      },
      description: {
        type: DataTypes.STRING,
      },
      product_status: {
        type: DataTypes.STRING,
        defaultValue: 'NOK'
      },
      remove_report: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
    }),
    await queryInterface.createTable('nok_analyses', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nok_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },
      nok_code_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cause_station_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cause_shift_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      time_waste: {
        type: DataTypes.INTEGER,
      },
      material_waste: {
        type: DataTypes.INTEGER,
      },
      closed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      close_date: {
        type: DataTypes.DATE,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    })
  },
  down: async ({ context: queryInterface } : any) => {
    await queryInterface.dropTable('nok_detects')
    await queryInterface.dropTable('nok_analyses')
  }
}