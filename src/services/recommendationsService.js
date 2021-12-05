/* eslint-disable consistent-return */
import { recommendationSchema } from '../schemas/recommendationSchema.js';
import * as repository from '../repositories/recommendationsRepository.js';

async function bodyValidation({ name, youtubeLink }) {
  const isCorrectBody = recommendationSchema.validate({
    name,
    youtubeLink,
  });
  if (isCorrectBody.error) {
    return null;
  }
  return 'ok';
}

async function getAtualScore(id) {
  const currentScore = await repository.getCurrentScore(id);
  const atualScore = currentScore;
  let newScore;
  if (atualScore) {
    newScore = atualScore + 1;
  } else {
    newScore = 1;
  }
  return newScore;
}

async function increaseScore(id) {
  const score = await getAtualScore(id);
  const requestInsertofNewScore = await repository.postNewScore(score, id);
  if (!requestInsertofNewScore) {
    return null;
  }
  return 'incremented';
}

async function decreasesScore(id) {
  const score = await getAtualScore(id);
  const requestInsertofNewScore = await repository.postNewScore(score, id);
  if (!requestInsertofNewScore) {
    return null;
  }
  return 'decremented';
}

async function requestRandomRecommendation() {
  const randomSong = await repository.getRandomRecommendations();
  if (!randomSong) {
    return null;
  }
  return (randomSong);
}

async function requestTopRecommendation() {
  const songWithTheHighestScore = await repository.getTopRecommendations();

  if (!songWithTheHighestScore) {
    const randomSong = await requestRandomRecommendation();
    return (randomSong);
  }
  return (songWithTheHighestScore);
}

async function requestBottomRecommendation() {
  const songWithTheLowestScore = await repository.getBottomRecommendations();

  if (!songWithTheLowestScore) {
    const randomSong = await requestRandomRecommendation();
    return (randomSong);
  }
  return (songWithTheLowestScore);
}

async function getRecommendations() {
  const randomNumber = Math.floor(Math.random() * 10 + 1);
  if (randomNumber <= 7) {
    const songWithTheHighestScore = await requestTopRecommendation();
    return (songWithTheHighestScore);
  }
  const songWithTheLowestScore = await requestBottomRecommendation();
  return (songWithTheLowestScore);
}

export {
  bodyValidation,
  increaseScore,
  decreasesScore,
  getRecommendations,
  getAtualScore,
  requestRandomRecommendation,
  requestTopRecommendation,
  requestBottomRecommendation,
};
