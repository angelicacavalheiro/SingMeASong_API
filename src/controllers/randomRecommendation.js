import connection from '../database/database.js';

async function randomRecommendation(req, res) {
  const randomNumber = Math.floor(Math.random() * 10 + 1);

  if (randomNumber <= 7) {
    const songWithTheHighestScore = await connection.query(`
      SELECT * FROM recommendations
      WHERE "score" > 10
      ORDER BY RANDOM()
      LIMIT 1
    `);

    if (!songWithTheHighestScore.rowCount) { // busca sem condições
      const songExists = await connection.query(`
        SELECT * FROM recommendations
        ORDER BY RANDOM()
        LIMIT 1
      `);
      if (!songExists.rowCount) {
        return res.sendStatus(404);
      }
      return res.status(200).send(songExists.rows[0]);
    }

    return res.status(200).send(songWithTheHighestScore.rows[0]);
  }

  const songWithTheLowestScore = await connection.query(`
    SELECT * FROM recommendations
    WHERE "score" >= -5 AND "score" <=10
    ORDER BY RANDOM()
    LIMIT 1
  `);

  if (!songWithTheLowestScore.rowCount) { // busca sem condições
    const songExists = await connection.query(`
      SELECT * FROM recommendations
      ORDER BY RANDOM()
      LIMIT 1
    `);
    if (!songExists.rowCount) {
      return res.sendStatus(404);
    }
    return res.status(200).send(songExists.rows[0]);
  }

  return res.status(200).send(songWithTheLowestScore.rows[0]);
}

export {
  randomRecommendation,
};
