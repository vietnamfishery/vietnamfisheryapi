import { Router } from 'express';
import * as Sequelize from 'sequelize';
import * as config from '../config';
import { logger } from '../services';

const { dialect, operatorsAliases, pool, replication } = config.config;
const sequelize = new Sequelize(config.databaseName, null, null, {
    dialect,
    operatorsAliases,
    pool,
    replication
});

export abstract class BaseServices {
    protected connection: any = {};

    public async connect (): Promise<any> {
        return new Promise((resolve, reject) => {
            return sequelize.authenticate();
        });
    }

    public async disconnect (name: string): Promise<boolean> {
        try {
            await this.connection[name].close();
            return true;

        } catch (err) {
            logger.error('Error while disconnecting from database:', err);
            return false;
        }
    }
}
