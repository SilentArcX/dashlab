export async function fetchStatsBlock(): Promise<string> {
  try {
    const res = await fetch(import.meta.env.VITE_API_BASE + '/usage');
    if (!res.ok) throw new Error('Usage API failed');

    const data = await res.json(); // { cpuPercent: 0, memoryPercent: 25 }

    const cpu = data.cpuPercent?.toFixed(1) ?? 'N/A';
    const ram = data.memoryPercent?.toFixed(1) ?? 'N/A';

    return `
      <h3>📊 시스템 자원 사용량</h3>
      <p><strong>CPU 사용량:</strong> ${cpu}%</p>
      <p><strong>RAM 사용량:</strong> ${ram}%</p>
    `;
  } catch (err) {
    console.error('사용량 정보 로드 실패:', err);
    return `<h3>📊 시스템 자원 정보를 불러오지 못했습니다.</h3>`;
  }
}