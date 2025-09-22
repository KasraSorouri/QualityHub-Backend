import { rollbackMigration } from '../configs/db';
import logger from './logger';

rollbackMigration()
  .catch((error) => {
    if (error instanceof Error) {
      logger.info('Failed to rollback migration', error.message);
    } else {
      logger.info('Failed to rollback migration', String(error));
    }
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
