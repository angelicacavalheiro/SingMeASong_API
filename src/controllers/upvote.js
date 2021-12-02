/* eslint-disable consistent-return */
import connection from '../database/database.js';

async function upvote(req, res) {
  const { id } = req.params;
  try {
    const result = await connection.query(`
        SELECT "score"
        FROM "recommendations"
        WHERE "id" = ($1);
      `, [id]);
    const atualScore = result.rows[0].score;
    let newScore;
    if (atualScore) {
      newScore = atualScore + 1;
    } else {
      newScore = 1;
    }

    await connection.query(`
        UPDATE "recommendations"
        SET "score" = $1
        WHERE "id" = $2
      `, [newScore, id]);

    return res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
}

export {
  upvote,
};
