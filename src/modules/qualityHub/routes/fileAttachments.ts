/* eslint-disable @typescript-eslint/no-misused-promises */
import Router from 'express';
import { rightAuthority, tokenExtractor } from '../../usersAndAuthentication/utils/midwares';
import fileAttachment from '../controllers/fileAttachment';
import upload from '../../../utils/multerMiddleware';

const router = Router();

// Upload NOK Images
router.post(
  '/nok_images',
  tokenExtractor,
  rightAuthority(['REGISTER-DEFECT', 'PRODUCT-ADD']),
  upload.array('images', 10),
  fileAttachment.addDefectImages,
);

// Get NOK Images
router.get('/nok_images/:nokId', tokenExtractor, rightAuthority([]), fileAttachment.getNokImages);

export default router;
