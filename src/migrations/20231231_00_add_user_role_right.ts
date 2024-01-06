import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface } : any) => {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      first_name: {
        type: DataTypes.TEXT,
      },
      last_name: {
        type: DataTypes.TEXT
      },
      email: {
        type: DataTypes.TEXT,
        unique: true
      },
      phone: { 
        type: DataTypes.TEXT
      },
      active: {
        type: DataTypes.BOOLEAN
      },
      date_created: {
        type: DataTypes.DATE
      }
    })
    await queryInterface.createTable('roles', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      role_name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
      },
      active: {
        type: DataTypes.BOOLEAN
      }
    })
    await queryInterface.createTable('rights', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      right: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
      },
      related_module: {
        type: DataTypes.TEXT,
        allowNull: false,
      }
    })
    await queryInterface.createTable('user_roles', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    })
    await queryInterface.createTable('role_rights', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      right_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    })
  },
  down: async ({ context: queryInterface } : any) => {
    await queryInterface.dropTable('users')
    await queryInterface.dropTable('roles')
    await queryInterface.dropTable('rights')
    await queryInterface.dropTable('user_roles')
    await queryInterface.dropTable('role_rights')
  }
}