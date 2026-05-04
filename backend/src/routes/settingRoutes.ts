import { Router } from 'express';
import { SettingController } from '../controllers/SettingController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', authMiddleware, SettingController.getSettings);
router.post('/', authMiddleware, SettingController.updateSettings);

export default router;
