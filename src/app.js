import express from 'express';
import cors from 'cors';

import { recommendation } from './controllers/ recommendation.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/status', (req, res) => {
  // Manda como resposta o texto 'Hello World'
  res.send('Server online');
});

app.post('/recommendations', recommendation);

export default app;
