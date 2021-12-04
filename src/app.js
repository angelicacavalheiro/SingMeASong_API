import express from 'express';
import cors from 'cors';

import * as controller from './controllers/recommendationsController.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/status', (req, res) => {
  // Manda como resposta o texto 'Server online''
  res.send('Server online');
});

app.post('/recommendations', controller.recommendation);

app.post('/recommendations/:id/upvote', controller.upvote);

app.post('/recommendations/:id/downvote', controller.downvote);

app.get('/recommendations/random', controller.randomRecommendation);

app.get('/recommendations/top/:amount', controller.topRecommendation);

export default app;
