export async function fetchEnvBlock(): Promise<string> {
    try {
        const res = await fetch(import.meta.env.VITE_API_BASE + '/env-info');
        if (!res.ok) throw new Error('Env info API failed');

        const data = await res.json(); // { environment: "Development" }

        const serverEnv = data.environment ?? 'Unknown';
        const clientEnv = import.meta.env.VITE_ENV_NAME ?? 'Unknown';

        return `
      <h3>🧭 환경 정보</h3>
      <p><strong>서버 환경:</strong> ${serverEnv}</p>
      <p><strong>클라이언트 환경:</strong> ${clientEnv}</p>
    `;
    } catch (err) {
        console.error('환경 정보 로드 실패:', err);
        return `<h3>🧭 환경 정보를 불러오지 못했습니다.</h3>`;
    }
}