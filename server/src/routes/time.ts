import { Router } from 'express';

const router = Router();

router.get('/time', (_req, res) => {
    res.json({ time: new Date().toISOString() });
});

export default router;
