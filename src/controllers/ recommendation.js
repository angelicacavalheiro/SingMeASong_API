import connection from '../database/database.js';
import { recommendationSchema } from '../schemas/recommendationSchema.js';

async function recommendation(req, res) {
  // CONTROLLER
  const {
    name,
    youtubeLink,
  } = req.body;
  // SERVICE
  const isCorrectBody = recommendationSchema.validate({
    name,
    youtubeLink,
  });
  if (isCorrectBody.error) {
    res.status(400).send(isCorrectBody.error.details[0].message);
  }

  try {
    // REPOSITORY
    await connection.query(`
        INSERT INTO recommendations (name, link) VALUES ($1, $2);
      `, [name, youtubeLink]);
    return res.sendStatus(200);
  } catch (error) {
    // MIDDLEWARE
    console.log(error);
    return res.sendStatus(500);
  }
}

export {
  recommendation,
};
