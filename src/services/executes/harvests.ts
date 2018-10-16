/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {harvestsInstance, harvestsAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<harvestsInstance, harvestsAttribute>('harvests', {
    harvestId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    harvestUUId: {
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
    harvestName: {
      type: DataTypes.STRING(50),
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
    tableName: 'harvests'
  });
};
