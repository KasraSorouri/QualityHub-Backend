import { DataTypes } from 'sequelize';
import { ClaimStatus, MaterialStatus, Reusable } from '../modules/qualityHub/types';

module.exports = {
  up: async ({ context: queryInterface } : any) => {
    await queryInterface.createTable('reworks', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
      nok_code_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      station_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      use_recipes: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
      affected_recipes: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
      },
      active: {
        type: DataTypes.BOOLEAN,
      },
      deprecated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      timeDuration: {
        type: DataTypes.INTEGER
      }
    }),
    await queryInterface.createTable('nok_reworks', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nok_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'nok_detects', key: 'id' }
      },
      rework_id: {
        type: DataTypes.INTEGER,   allowNull: true,
        references: { model: 'reworks', key: 'id' }
      }
    }),
    await queryInterface.createTable('dismantle_materials', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nok_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'nok_detects', key: 'id' }
      },
      material_id: {
        type: DataTypes.INTEGER,   allowNull: true,
        references: { model: 'materials', key: 'id' }
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull:true
      },
      reusable: {
        type: DataTypes.ENUM,
        values: Object.values(Reusable)
      },
      material_status: {
        type: DataTypes.ENUM,
        values: Object.values(MaterialStatus)
      },
      claim_status: {
        type: DataTypes.ENUM,
        values: Object.values(ClaimStatus),
        allowNull: false,
        defaultValue: ClaimStatus.PENDING
      }
    })
  },
  down: async ({ context: queryInterface } : any) => {
    await queryInterface.dropTable('desmantle_materials')
    await queryInterface.dropTable('nok_reworks')
    await queryInterface.dropTable('reworks')
  }
}