/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {stockingInstance, stockingAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<stockingInstance, stockingAttribute>('stocking', {
    stockingId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    stockingUUId: {
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
    notes: {
      type: DataTypes.TEXT,
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
    tableName: 'stocking'
  });
};
