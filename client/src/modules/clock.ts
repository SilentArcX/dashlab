// client\src\modules\clock.ts
import { API_BASE, CLOCK_RETRY_INTERVAL } from '../config';

const timeElem = document.querySelector('.time-display') as HTMLDivElement;

let currentTime: Date | null = null;

function formatTime(date: Date) {
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    const s = String(date.getSeconds()).padStart(2, '0');
    return `${h}:${m}:${s}`;
}

function updateClockDisplay() {
    if (timeElem) {
        if (currentTime) {
            timeElem.textContent = formatTime(currentTime);
        }
        else {
            timeElem.textContent = '--:--:--';
        }
    }
}

// 서버에서 현재 시간 가져오기
async function fetchCurrentTime() {
    const response = await fetch(`${API_BASE}/stats`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return new Date(data.timeStamp);
}

async function fetchTimeWithRetry(): Promise<Date | null> {
    while (true) {
        try {
            const time = await fetchCurrentTime();
            return time; // 성공적으로 시간을 가져오면 반환
        } catch (error) {
            console.error(
                'Error fetching current time, retrying in', CLOCK_RETRY_INTERVAL / 1000, 's');
            await new Promise(res => setTimeout(res, CLOCK_RETRY_INTERVAL));
        }
    }
}

export async function startClock() {
    currentTime = await fetchTimeWithRetry();
    updateClockDisplay();

    setInterval(() => {
        if (currentTime) {
            currentTime.setSeconds(currentTime.getSeconds() + 1);
            updateClockDisplay();
        }
    }, 1000);
}