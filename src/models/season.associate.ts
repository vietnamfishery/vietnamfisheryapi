import * as Sequeliz from 'sequelize';

export function seasonToPonds(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'seasonToPonds',
        foreignKey: {
            name: 'pondId',
            field: 'pondId'
        }
    });
}

export function seasonToPonddiary(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'seasonToPonddiary',
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}

export function seasonToPondprepare(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'seasonToPondprepare',
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}

export function seasonToTakecare(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'seasonToTakecare',
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}

export function seasonToGrowths(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'seasonToGrowths',
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}

export function seasonToDiedfisherys(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'seasonToDiedfisherys',
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}

export function seasonToPondenvironments(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'seasonToPondenvironments',
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}

export function seasonToStocking(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'seasonToStocking',
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}

export function seasonToHarvest(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'seasonToHarvest',
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}
