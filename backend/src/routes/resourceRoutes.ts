import { Router } from 'express';
import { getResources, getResourceById, createResource, updateResource, deleteResource } from '../controllers/ResourceController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', getResources);
router.get('/:id', getResourceById);
router.post('/', authMiddleware, createResource);
router.put('/:id', authMiddleware, updateResource);
router.delete('/:id', authMiddleware, deleteResource);

export default router;
