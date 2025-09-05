// routes/status.ts
import { Router } from 'express';
import { getSystemUsage } from '../utils/monitoring';
import { timeStamp } from 'console';

const router = Router();

router.get('/', async (_req, res) => {
    try {
        const usage = await getSystemUsage();
        const status = {
            cpu: usage.cpu,
            ram: usage.ram,
            timeStamp: new Date().toISOString(),
        };
        res.json(status);
    } catch (err) {
        console.error('Failed to get system status:', err);
        res.status(500).json({ error: 'Failed to get system status' });
    }
});

export default router;