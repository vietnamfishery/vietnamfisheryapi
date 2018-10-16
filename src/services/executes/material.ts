/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {materialInstance, materialAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<materialInstance, materialAttribute>('material', {
    materialUUId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      unique: true
    },
    couponId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'coupon',
        key: 'couponId'
      }
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
    provider: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    providerAddress: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    unit: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    dom: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    ed: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    prodcutionBatch: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'material'
  });
};
