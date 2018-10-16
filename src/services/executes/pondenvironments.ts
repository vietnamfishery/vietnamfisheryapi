/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {pondenvironmentsInstance, pondenvironmentsAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<pondenvironmentsInstance, pondenvironmentsAttribute>('pondenvironments', {
    pondEnvironmentId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    pondEnvironmentUUId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      unique: true
    },
    seasonId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'season',
        key: 'seasonId'
      }
    },
    oxyMorning: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    oxyAfternoon: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    phMorning: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    phAfternoon: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    transparent: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    salinity: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    h2s: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    nh3: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    bazo: {
      type: DataTypes.FLOAT,
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
    tableName: 'pondenvironments'
  });
};
