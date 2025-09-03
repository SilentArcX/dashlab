import { toKSTTimeString } from '../utils/time';

export async function fetchTimeBlock(): Promise<string> {
  try {
    const res = await fetch(import.meta.env.VITE_API_BASE + '/time');
    const data = await res.json();
    const timeStr = toKSTTimeString(data.time);

    return `<h2>🕒 현재 시각 (KST): ${timeStr}</h2>`;
  } catch {
    return `<h2>시간 정보를 가져올 수 없습니다.</h2>`;
  }
}