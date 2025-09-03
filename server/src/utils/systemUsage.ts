import os from 'os';

export interface SystemUsage {
    cpuPercent: number;
    memoryPercent: number;
}

let cachedUsage: SystemUsage | null = null;
let cacheTime = 0;
const CACHE_DURATION_MS = 60 * 1000;

function getMemoryUsagePercent(): number {
    const total = os.totalmem();
    const free = os.freemem();
    return Math.round(((total - free) / total) * 100);
}

function getCpuUsagePercent(): Promise<number> {
    return new Promise((resolve) => {
        const start = os.cpus();
        setTimeout(() => {
            const end = os.cpus();
            let idle = 0, total = 0;
            for (let i = 0; i < start.length; i++) {
                const s = start[i].times, e = end[i].times;
                idle += e.idle - s.idle;
                total += (e.user - s.user) + (e.nice - s.nice) + (e.sys - s.sys) + (e.irq - s.irq) + (e.idle - s.idle);
            }
            resolve(100 - Math.round((idle / total) * 100));
        }, 100);
    });
}

export async function getSystemUsage(): Promise<SystemUsage> {
    const now = Date.now();
    if (cachedUsage && now - cacheTime < CACHE_DURATION_MS) return cachedUsage;

    const cpu = await getCpuUsagePercent();
    const memory = getMemoryUsagePercent();
    cachedUsage = { cpuPercent: cpu, memoryPercent: memory };
    cacheTime = now;
    return cachedUsage;
}