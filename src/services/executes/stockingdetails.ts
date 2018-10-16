/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {stockingdetailsInstance, stockingdetailsAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<stockingdetailsInstance, stockingdetailsAttribute>('stockingdetails', {
    stockingDetailUUId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      unique: true
    },
    breedId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'breeds',
        key: 'breedId'
      }
    },
    stockingId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'stocking',
        key: 'stockingId'
      }
    },
    costOfStocking: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    stockingQuantity: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    phFirst: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    salinityFIRST: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    isDeleted: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'stockingdetails'
  });
};
