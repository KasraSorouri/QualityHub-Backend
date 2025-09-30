import { Sequelize } from 'sequelize';
import { DATABASE_URI } from './config';
import { Umzug, SequelizeStorage } from 'umzug';

import logger from '../utils/logger';

if (!DATABASE_URI) {
  logger.info('Database URI is not found!');
}
const sequelize = new Sequelize(DATABASE_URI as string, {
  logging: true,
});

const migrationConf = {
  migrations: {
    glob: './src/migrations/*.ts',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migration' }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const runMigration = async (): Promise<void> => {
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();
  logger.info('migration up to date', {
    files: migrations.map((mig) => mig.name),
  });
};


const connectToDatabase = async (): Promise<void | null> => {
  try {
    await sequelize.authenticate();
    if (process.env.ENVIRONMENT === 'dev' || process.env.ENVIRONMENT === 'test' || process.env.ENVIRONMENT === 'init') {
      await runMigration();
    }      
    logger.info('Connection has been established successfully.');
  } catch (error) {
    if (error instanceof Error) logger.info('Unable to connect to the database:', error.message);
    return process.exit(1);
  }
  return null;
};

const rollbackMigration = async (): Promise<void> => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
};

export { connectToDatabase, sequelize, rollbackMigration };
