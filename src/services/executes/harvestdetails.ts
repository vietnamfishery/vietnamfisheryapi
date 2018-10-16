/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {harvestdetailsInstance, harvestdetailsAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<harvestdetailsInstance, harvestdetailsAttribute>('harvestdetails', {
    harvestIdDetailUUId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      unique: true
    },
    harvestId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'harvests',
        key: 'harvestId'
      }
    },
    breedName: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'harvestdetails'
  });
};
