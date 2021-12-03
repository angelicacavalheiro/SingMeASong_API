/* eslint-disable consistent-return */
import connection from '../database/database.js';

async function downvote(req, res) {
  const { id } = req.params;
  try {
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

    // pegando score atual
    const result = await connection.query(`
        SELECT "score"
        FROM "recommendations"
        WHERE "id" = ($1);
      `, [id]);
    const atualScore = result.rows[0].score;
    let newScore;

    // apagando caso score seja menor que -5
    if (atualScore && (atualScore === (-5))) {
      await connection.query(`
        DELETE
        FROM "recommendations"
        WHERE "id" = ($1);
      `, [id]);
      return res.status(200).send('deleted recommendation');
    } if (atualScore) {
      newScore = atualScore - 1;
    } else {
      newScore = -1;
    }

    // atualizando
    await connection.query(`
        UPDATE "recommendations"
        SET "score" = $1
        WHERE "id" = $2
      `, [newScore, id]);

    return res.status(200).send('decremented');
  } catch (error) {
    res.sendStatus(500);
  }
}

export {
  downvote,
};
