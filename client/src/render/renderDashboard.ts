import { fetchTimeBlock } from '../api/fetchTime';
import { fetchStatsBlock } from '../api/fetchStats';
import { fetchEnvBlock } from '../api/fetchEnv';

export async function renderDashboard() {
  const root = document.getElementById('root');
  if (!root) return;

  const [timeHtml, statsHtml, envHtml] = await Promise.all([
    fetchTimeBlock(),
    fetchStatsBlock(),
    fetchEnvBlock()
  ]);

  root.innerHTML = `
    ${timeHtml}
    <hr />
    ${statsHtml}
    <hr />
    ${envHtml}
  `;
}