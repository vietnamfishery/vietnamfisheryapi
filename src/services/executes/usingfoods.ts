/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {usingfoodsInstance, usingfoodsAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<usingfoodsInstance, usingfoodsAttribute>('usingfoods', {
    usingFoodUUId: {
      type: DataTypes.BIGINT,
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
    massOfFishery: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    feedingRate: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    totalFood: {
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
    isDeleted: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'usingfoods'
  });
};
