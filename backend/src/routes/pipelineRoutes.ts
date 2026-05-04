import express from 'express';
import { PipelineController } from '../controllers/PipelineController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.use(authMiddleware);

router.get('/', PipelineController.getPipelines);
router.post('/', PipelineController.createPipeline);
router.patch('/:id', PipelineController.updatePipeline);
router.delete('/:id', PipelineController.deletePipeline);

export default router;
