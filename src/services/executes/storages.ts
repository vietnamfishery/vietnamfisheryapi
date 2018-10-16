/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {storagesInstance, storagesAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<storagesInstance, storagesAttribute>('storages', {
    storageId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    storageUUId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      unique: true
    },
    unitName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    unitType: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
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
    tableName: 'storages'
  });
};
