import { DataTypes } from 'sequelize';
import { ClaimStatus, MaterialStatus, Reusable, ReworkStatus } from '../modules/qualityHub/types';

module.exports = {
  up: async ({ context: queryInterface } : any) => {
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
      rework_actions_id: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
        refrences: { model: 'reworks' , key: 'id' }
      }
      ,affected_recipes: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
        refrences: { model: 'recipes', key: 'id' }
      }
      ,rework_shift_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        refrences: { model: 'shifts', key: 'id' }
      },
      rework_operator: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rework_time: {
        type: DataTypes.DATE,
        allowNull: false
      },
      rework_duration: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      rework_man_power: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      rework_note: {
        type: DataTypes.STRING
      },
      rework_status: {
        type: DataTypes.ENUM(...Object.values(ReworkStatus)),
        allowNull: false
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
      rework_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'nok_reworks', key: 'id' }
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
      recipe_bom_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'recipe_boms', key: 'id' }
      },
      material_status: {
        type: DataTypes.ENUM(...Object.values(MaterialStatus)),
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
    await queryInterface.dropTable('dismantle_materials')
    await queryInterface.dropTable('nok_reworks')
  }
}