/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {seasonInstance, seasonAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<seasonInstance, seasonAttribute>('season', {
    seasonId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    seasonUUId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      unique: true
    },
    pondId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'ponds',
        key: 'pondId'
      }
    },
    seasonName: {
      type: DataTypes.STRING(100),
      allowNull: false
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
    tableName: 'season'
  });
};
