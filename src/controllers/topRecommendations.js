import connection from '../database/database.js';

async function topRecommendation(req, res) {
  const { amount } = req.params;

  const songWithTheHighestScore = await connection.query(`
    SELECT * FROM recommendations
    WHERE "score" >= -5
    ORDER BY "score" DESC
    LIMIT ($1)
  `, [amount]);
  return res.status(200).send(songWithTheHighestScore.rows);
}

export {
  topRecommendation,
};
