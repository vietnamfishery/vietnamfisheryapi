/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {growthsInstance, growthsAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<growthsInstance, growthsAttribute>('growths', {
    growthId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    growthUUId: {
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
    averageDensity: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    averageMass: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    speedOdGrowth: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    livingRatio: {
      type: DataTypes.FLOAT,
      allowNull: false
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
    tableName: 'growths'
  });
};
