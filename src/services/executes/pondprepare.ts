/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {pondprepareInstance, pondprepareAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<pondprepareInstance, pondprepareAttribute>('pondprepare', {
    pondPrepareId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    pondPrepareUUId: {
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
    pondprepareName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createdBy: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedBy: {
      type: DataTypes.CHAR(36),
      allowNull: false
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
    tableName: 'pondprepare'
  });
};
