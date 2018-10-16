/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {pricesInstance, pricesAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<pricesInstance, pricesAttribute>('prices', {
    priceId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    priceUUId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      unique: true
    },
    storageId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'storages',
        key: 'storageId'
      }
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    unit: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    value: {
      type: DataTypes.FLOAT,
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
    tableName: 'prices'
  });
};
