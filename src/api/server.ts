import express from 'express';
import cors from 'cors';
import { agentRouter } from './routes/agent';

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.json());

app.use('/api/agent', agentRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`AgentFlow API server running on port ${PORT}`);
});

export default app;
