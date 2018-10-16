/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {pondsInstance, pondsAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<pondsInstance, pondsAttribute>('ponds', {
    pondId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    pondUUId: {
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
    pondName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    pondArea: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    pondDepth: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    createCost: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    images: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    pondLatitude: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    pondLongitude: {
      type: DataTypes.FLOAT,
      allowNull: true
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
    updatedBy: {
      type: DataTypes.CHAR(36),
      allowNull: true
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
    tableName: 'ponds'
  });
};
