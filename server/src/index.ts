import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import usageRoutes from './routes/usage';
import timeRoutes from './routes/time';

dotenv.config();
const env = process.env.NODE_ENV || 'development';

const port = Number(process.env.PORT) || 3000;
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

const app = express();

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`[CORS] Blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.get('/env-info', (_req, res) => {
  res.json({ environment: process.env.ENV_INDICATOR || 'No environment info' });
});

app.use(usageRoutes);
app.use(timeRoutes);

app.listen(port, () => {
  console.log(`\n${process.env.ENV_INDICATOR} Server running on port ${port}`);
  if (env !== 'production') {
    console.log(`→ http://localhost:${port}`);
    console.log(`→ Environment Info: http://localhost:${port}/env-info`);
  }
  console.log(`\n🌐 Allowed Origins:`);
  allowedOrigins.forEach(origin => console.log(`   - ${origin}`));
  console.log('');
});