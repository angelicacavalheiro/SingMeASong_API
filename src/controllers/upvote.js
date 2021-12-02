/* eslint-disable consistent-return */
import connection from '../database/database.js';

async function upvote(req, res) {
  const { id } = req.params;
  try {
    // MIDDLEWARE
    // vendo se esse id corresponde a alguma recomendação existente
    const getId = await connection.query(`
     SELECT "id"
     FROM "recommendations"
     WHERE "id" = ($1);
   `, [id]);
    const exists = getId.rowCount;
    if (!exists) {
      return res.status(404).send('there is no recommendation with this id');
    }

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

    return res.status(200).send('incremented');
  } catch (error) {
    res.sendStatus(500);
  }
}

export {
  upvote,
};
