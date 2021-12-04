/* eslint-disable consistent-return */
import * as service from '../services/recommendationsService.js';
import * as repository from '../repositories/recommendationsRepository.js';

async function recommendation(req, res) {
  const {
    name,
    youtubeLink,
  } = req.body;

  const isCorrectBody = await service.bodyValidation({
    name,
    youtubeLink,
  });
  if (!isCorrectBody) {
    res.status(400).send('incorrect youtube link or unnamed');
  }

  try {
    const requestInsert = await repository.postRecommendation(name, youtubeLink);
    if (requestInsert) {
      return res.sendStatus(200);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

async function upvote(req, res) {
  const { id } = req.params;
  try {
    const existsId = await repository.getId(id);
    if (!existsId) {
      return res.status(404).send('there is no recommendation with this id');
    }

    const upvoteOnAnId = await service.increaseScore(id);
    if (upvoteOnAnId) {
      return res.status(200).send('incremented');
    }
    return res.status(500).send('Something went wrong');
  } catch (error) {
    res.sendStatus(500);
  }
}

async function downvote(req, res) {
  const { id } = req.params;
  try {
    const existsId = await repository.getId(id);
    if (!existsId) {
      return res.status(404).send('there is no recommendation with this id');
    }

    const downvoteOnAnId = await service.decreasesScore(id);
    if (downvoteOnAnId) {
      return res.status(200).send('decremented');
    }
    return res.status(500).send('Something went wrong');
  } catch (error) {
    res.sendStatus(500);
  }
}

async function topRecommendation(req, res) {
  const { amount } = req.params;

  const songWithTheHighestScore = await repository.topRecommendations(amount);
  return res.status(200).send(songWithTheHighestScore);
}

async function randomRecommendation(req, res) {
  const randomSongs = await service.getRecommendations();
  if (!randomSongs) {
    return res.sendStatus(404);
  }
  return res.status(200).send(randomSongs);
}

export {
  recommendation,
  upvote,
  downvote,
  topRecommendation,
  randomRecommendation,
};
