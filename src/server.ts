import app from './app';
import { PORT } from './configs/config';
import { connectToDatabase } from './configs/db';
import logger from './utils/logger';

const start = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
    });
  } catch (_error) {
    logger.info('Failed to start server');
    process.exit(1);
  }
};

start().catch((error) => {
  logger.info('Failed to start server', { error: error instanceof Error ? error.message : String(error) });
  process.exit(1);
});
