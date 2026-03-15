import multer, { Multer, StorageEngine } from 'multer';
import { MAX_Attachment_Size } from '../configs/config';

const storage: StorageEngine = multer.memoryStorage();

const upload: Multer = multer({
  storage: storage,
  limits: {
    fileSize: MAX_Attachment_Size * 1024 * 1024,
  },
});

export default upload;
