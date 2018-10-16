/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {boughtbreeddetailsInstance, boughtbreeddetailsAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<boughtbreeddetailsInstance, boughtbreeddetailsAttribute>('boughtbreeddetails', {
    boughtBreedDetailUUId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      unique: true
    },
    boughtBreedId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'boughtbreeds',
        key: 'boughtBreedId'
      }
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
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    soldAddress: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    isDeleted: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'boughtbreeddetails'
  });
};
