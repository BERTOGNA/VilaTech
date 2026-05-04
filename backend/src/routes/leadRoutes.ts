import { Router } from 'express';
import { createOrUpdateLead, getLeads, getLeadById, updateLead, updateLeadStage } from '../controllers/LeadController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/', authMiddleware, createOrUpdateLead);
router.get('/', authMiddleware, getLeads);
router.get('/:id', authMiddleware, getLeadById);
router.patch('/:id', authMiddleware, updateLead);
router.patch('/:id/stage', authMiddleware, updateLeadStage);

export default router;
