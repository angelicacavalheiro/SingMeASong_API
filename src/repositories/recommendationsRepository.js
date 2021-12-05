import connection from '../database/database.js';

async function postRecommendation(name, youtubeLink) {
  const result = await connection.query(`
    INSERT INTO recommendations (name, "youtubeLink") VALUES ($1, $2);
  `, [name, youtubeLink]);
  if (!result.rowCount) {
    return null;
  } return 'ok';
}

async function getId(id) {
  const result = await connection.query(`
    SELECT "id"
    FROM "recommendations"
    WHERE "id" = ($1);
    `, [id]);
  if (!result.rowCount) {
    return null;
  } return 'ok';
}

async function getCurrentScore(id) {
  const result = await connection.query(`
    SELECT "score"
    FROM "recommendations"
    WHERE "id" = ($1);
  `, [id]);
  return (result.rows[0].score);
}

async function postNewScore(score, id) {
  const result = await connection.query(`
    UPDATE "recommendations"
    SET "score" = $1
    WHERE "id" = $2
  `, [score, id]);

  return result.rowCount;
}

async function topRecommendations(amount) {
  const result = await connection.query(`
    SELECT * FROM recommendations
    WHERE "score" >= -5
    ORDER BY "score" DESC
    LIMIT ($1)
  `, [amount]);
  return result.rows;
}

async function getTopRecommendations() {
  const result = await connection.query(`
      SELECT * FROM recommendations
      WHERE "score" > 10
      ORDER BY RANDOM()
      LIMIT 1
  `);
  if (!result.rowCount) {
    return null;
  } return result.rows[0];
}

async function getRandomRecommendations() {
  const result = await connection.query(`
    SELECT * FROM recommendations
    ORDER BY RANDOM()
    LIMIT 1
  `);
  if (!result.rowCount) {
    return null;
  } return result.rows[0];
}

async function getBottomRecommendations() {
  const result = await connection.query(`
    SELECT * FROM recommendations
    WHERE "score" >= -5 AND "score" <=10
    ORDER BY RANDOM()
    LIMIT 1
  `);
  if (!result.rowCount) {
    return null;
  } return result.rows[0];
}

export {
  postRecommendation,
  getId,
  getCurrentScore,
  postNewScore,
  topRecommendations,
  getTopRecommendations,
  getRandomRecommendations,
  getBottomRecommendations,
};
