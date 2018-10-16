/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {breedsInstance, breedsAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<breedsInstance, breedsAttribute>('breeds', {
    breedId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    breedUUId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      unique: true
    },
    breedName: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    loopOfBreed: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    testingAgency: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    descriptions: {
      type: DataTypes.TEXT,
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
    tableName: 'breeds'
  });
};
