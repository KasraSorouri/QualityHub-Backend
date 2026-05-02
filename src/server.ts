import http from 'http';
import { initSocketIO } from './socetService';
import app from './app';
import { PORT } from './configs/config';
import { connectToDatabase } from './configs/db';
import logger from './utils/logger';

// Initialize Server and Socket.IO
const server = http.createServer(app);

initSocketIO(server);



const start = async (): Promise<void> => {
  try {
    await connectToDatabase();
    server.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
      logger.info('🔌 WebSocket active and listening for connections on the same port');
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
