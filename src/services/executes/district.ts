/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {districtInstance, districtAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<districtInstance, districtAttribute>('district', {
    districtid: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    provinceid: {
      type: DataTypes.STRING(5),
      allowNull: false
    }
  }, {
    tableName: 'district'
  });
};
