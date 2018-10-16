/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {diedfisherysInstance, diedfisherysAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<diedfisherysInstance, diedfisherysAttribute>('diedfisherys', {
    diedFisheryId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    diedFisheryUUId: {
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
    card: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    solutions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    employee: {
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
    tableName: 'diedfisherys'
  });
};
