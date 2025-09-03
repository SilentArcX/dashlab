import { Router } from 'express';
import { getSystemUsage } from '../utils/systemUsage';

const router = Router();

router.get('/usage', async (_req, res) => {
    try {
        const usage = await getSystemUsage();
        res.json(usage);
    } catch {
        res.status(500).json({ error: 'Failed to get system usage' });
    }
});

export default router;
