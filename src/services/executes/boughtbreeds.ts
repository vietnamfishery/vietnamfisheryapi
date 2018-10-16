/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {boughtbreedsInstance, boughtbreedsAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<boughtbreedsInstance, boughtbreedsAttribute>('boughtbreeds', {
    boughtBreedId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    boughtBreedUUId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      unique: true
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'users',
        key: 'userId'
      }
    },
    boughtBreedName: {
      type: DataTypes.STRING(50),
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
    tableName: 'boughtbreeds'
  });
};
