import { rollbackMigration } from '../configs/db';

rollbackMigration().catch((error) => {
  console.error('Failed to rollback migration', error); 
  process.exit(1);
}).finally(() => {
  process.exit(0);
});
