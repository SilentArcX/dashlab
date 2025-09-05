// index.ts

// 외부 라이브러리 임포트
import express from 'express';
import cors from 'cors';

// 내부 모듈 임포트
import { ENV, PORT, ALLOWED_ORIGINS } from './config/env';
import statusRoutes from './routes/status';

// Express 앱 생성
const app = express();

// CORS 설정: 허용된 origin만 통과, 그 외는 경고
app.use(cors({
  origin(origin, callback) {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`[CORS] Blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// 환경 정보 확인용 라우트
app.get('/env', (_req, res) => {
  res.json({
    environment: ENV || 'No environment info',
    port: PORT || 'No port info',
    allowedOrigins: ALLOWED_ORIGINS.length ? ALLOWED_ORIGINS : 'No allowed origins'
  });
});

// 주요 라우트 등록
app.use('/status', statusRoutes);

// 서버 시작
app.listen(PORT, () => {
  console.log(`\n${ENV} Server running on port ${PORT}`);

  if (ENV !== 'production') {
    console.log(`→ http://localhost:${PORT}/status`);
  }
  
  console.log(`\n🌐 Allowed Origins:`);
  ALLOWED_ORIGINS.forEach(origin => console.log(`   - ${origin}`));
  console.log('');
});