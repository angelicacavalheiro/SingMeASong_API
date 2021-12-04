import express from 'express';
import cors from 'cors';

import { recommendation } from './controllers/recommendation.js';
import { upvote } from './controllers/upvote.js';
import { downvote } from './controllers/downvote.js';
import { randomRecommendation } from './controllers/randomRecommendation.js';
import { topRecommendation } from './controllers/topRecommendations.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/status', (req, res) => {
  // Manda como resposta o texto 'Server online''
  res.send('Server online');
});

app.post('/recommendations', recommendation);

app.post('/recommendations/:id/upvote', upvote);

app.post('/recommendations/:id/downvote', downvote);

app.get('/recommendations/random', randomRecommendation);

app.get('/recommendations/top/:amount', topRecommendation);

export default app;
