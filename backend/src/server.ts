import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import leadRoutes from './routes/leadRoutes';
import pipelineRoutes from './routes/pipelineRoutes';
import taskRoutes from './routes/taskRoutes';
import settingRoutes from './routes/settingRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/leads', leadRoutes);
app.use('/api/pipelines', pipelineRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/settings', settingRoutes);

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default app;
