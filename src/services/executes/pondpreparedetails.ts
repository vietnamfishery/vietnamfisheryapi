/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {pondpreparedetailsInstance, pondpreparedetailsAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<pondpreparedetailsInstance, pondpreparedetailsAttribute>('pondpreparedetails', {
    pondPrepareDetailUUId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      unique: true
    },
    pondPrepareId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'pondprepare',
        key: 'pondPrepareId'
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
    pondPrepareDetailId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    isDeleted: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'pondpreparedetails'
  });
};
