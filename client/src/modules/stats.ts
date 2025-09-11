// client/src/modules/stats.ts
import { API_BASE, STATS_REFRESH_INTERVAL } from '../config';

const cpuElem = document.getElementById('cpu') as HTMLSpanElement;
const ramElem = document.getElementById('ram') as HTMLSpanElement;
const cpuBar = document.getElementById('cpu-bar') as HTMLDivElement;
const ramBar = document.getElementById('ram-bar') as HTMLDivElement;

interface StatsData {
    cpu: number;
    ram: {
        used: number;
        total: number;
        percent: number;
    };
    timeStamp: string;
}

async function fetchStats(): Promise<StatsData> {
    const response = await fetch(`${API_BASE}/stats`);
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
}

export function startStatsUpdater() {
    async function updateStats() {
        try {
            const data = await fetchStats();

            const cpu = Math.min(Math.max(data.cpu, 0), 100);
            const ram = Math.min(Math.max(data.ram.percent, 0), 100);

            if (cpuElem) cpuElem.textContent = `${cpu}%`;
            if (ramElem) ramElem.textContent = `${ram}%`;

            if (cpuBar) cpuBar.style.width = `${cpu}%`;
            if (ramBar) ramBar.style.width = `${ram}%`;

        } catch (error) {
            console.error('Error fetching stats:', error);
            if (cpuElem) cpuElem.textContent = 'N/A';
            if (ramElem) ramElem.textContent = 'N/A';
            if (cpuBar) cpuBar.style.width = `0%`;
            if (ramBar) ramBar.style.width = `0%`;
        }
    }

    updateStats();
    setInterval(updateStats, STATS_REFRESH_INTERVAL);
}