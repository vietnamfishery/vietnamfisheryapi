/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {ponduserrolesInstance, ponduserrolesAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<ponduserrolesInstance, ponduserrolesAttribute>('ponduserroles', {
    rolesId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    pondId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'ponduserroles'
  });
};
