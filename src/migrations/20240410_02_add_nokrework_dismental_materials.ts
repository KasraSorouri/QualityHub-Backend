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
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'reworks' , key: 'id' }
      }
      ,affected_recipes: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'recipes', key: 'id' }
      }
      ,rework_shift_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'work_shifts', key: 'id' }
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
        type: DataTypes.INTEGER,
        allowNull: true,
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
    await queryInterface.createTable('nok_reworks_rework_actions', {
      nok_reworks_id: {
        type: DataTypes.INTEGER,
        references: { model: 'nok_reworks', key: 'id' },
        onDelete: 'CASCADE'
      },
      rework_actions_id: {
        type: DataTypes.INTEGER,
        references: { model: 'reworks', key: 'id' },
        onDelete: 'CASCADE'
      }
    });
    await queryInterface.createTable('nok_reworks_affected_recipes', {
      nok_reworks_id: {
        type: DataTypes.INTEGER,
        references: { model: 'nok_reworks', key: 'id' },
        onDelete: 'CASCADE'
      },
      affected_recipes_id: {
        type: DataTypes.INTEGER,
        references: { model: 'recipes', key: 'id' },
        onDelete: 'CASCADE'
      }
    });

 },
  down: async ({ context: queryInterface } : any) => {
    await queryInterface.dropTable('dismantle_materials')
    await queryInterface.dropTable('nok_reworks')
    await queryInterface.dropTable('nok_reworks_rework_actions');
    await queryInterface.dropTable('enum_dismantle_materials_material_status');
  }
}