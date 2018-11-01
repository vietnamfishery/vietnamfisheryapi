import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function userToBoughtBreeds(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.USER_2_BOUGHT_BREED,
        foreignKey: {
            name: 'userId',
            field: 'userId'
        }
    });
}

//

export function userToDistrict(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.USER_2_DIS,
        foreignKey: {
            field: 'district',
            name: 'district'
        }
    });
}

export function userToRolesUser(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.USER_2_ROLE_USER,
        foreignKey: {
            name: 'userId',
            field: 'userId'
        }
    });
}

export function userToPond(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.USER_2_POND,
        foreignKey: {
            name: 'userId',
            field: 'userId'
        }
    });
}

export function userToCoupon(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.USER_2_COUPON,
        foreignKey: {
            name: 'userId',
            field: 'userId'
        }
    });
}

export function userToProvince(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.USER_2_PRO,
        foreignKey: {
            name: 'province',
            field: 'province'
        }
    });
}

export function userToSeason(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.USER_2_SEASON,
        foreignKey: {
            name: 'userId',
            field: 'userId'
        }
    });
}

export function userToWard(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.USER_2_WAR,
        foreignKey: {
            name: 'town',
            field: 'town'
        }
    });
}

export function userToRolesBoss(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.USER_2_ROLES_BOSS,
        foreignKey: {
            name: 'userId',
            field: 'userId'
        }
    });
}

export function userToOwnerStorage(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasOne(model, {
        as: ActionAssociateDatabase.USER_2_OWNER_STORAGE,
        foreignKey: {
            name: 'userId',
            field: 'userId'
        }
    });
}
