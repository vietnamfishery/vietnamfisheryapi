/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {usersInstance, usersAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<usersInstance, usersAttribute>('users', {
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userUUId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      unique: true
    },
    firstname: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true
    },
    addressContact: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(36),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    town: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    district: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    province: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    images: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createdBy: {
      type: DataTypes.CHAR(36),
      allowNull: true
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedBy: {
      type: DataTypes.CHAR(36),
      allowNull: true
    },
    updatedDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    isDeleted: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'users'
  });
};
