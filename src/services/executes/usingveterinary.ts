/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {usingveterinaryInstance, usingveterinaryAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<usingveterinaryInstance, usingveterinaryAttribute>('usingveterinary', {
    usingVeterinaryUUId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      unique: true
    },
    storageId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'storages',
        key: 'storageId'
      }
    },
    takeCareId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'takecare',
        key: 'takeCareId'
      }
    },
    causesNSymptoms: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    averageSize: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    totalBiomass: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    result: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    latestHarvestDate: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    mentor: {
      type: DataTypes.STRING(50),
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
    isDeleted: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'usingveterinary'
  });
};
