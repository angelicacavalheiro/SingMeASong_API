/* eslint-disable no-undef */
import * as service from '../../src/services/recommendationsService.js';
import * as repository from '../../src/repositories/recommendationsRepository.js';

describe('Body validation service', () => {
  it('returns "ok" for valid body', async () => {
    const name = 'Relax Your Mind - Lofi hip hop mix';
    const youtubeLink = 'https://www.youtube.com/watch?v=A_mr3LUPqSQ&ab_channel=ChilliVibes';
    const result = await service.bodyValidation({ name, youtubeLink });
    expect(result).toEqual('ok');
  });

  it('returns null for invalid body', async () => {
    const name = 'Relax Your Mind - Lofi hip hop mix';
    const youtubeLink = 'https://www.youtu.com/watch?v=A_mr3LUPqSQ&ab_channel=ChilliVibes';
    const result = await service.bodyValidation({ name, youtubeLink });
    expect(result).toEqual(null);
  });
});

describe('Get atual score service', () => {
  it('returns current score incremented by 1 for songs that have a score', async () => {
    const id = 1;
    jest.spyOn(repository, 'getCurrentScore').mockImplementationOnce(() => 2);
    const result = await service.getAtualScore(id);
    console.log(result);
    expect(result).toEqual(3);
  });

  it('returns 1 for songs that have a null score', async () => {
    const id = 1;
    jest.spyOn(repository, 'getCurrentScore').mockImplementationOnce(() => null);
    const result = await service.getAtualScore(id);
    expect(result).toEqual(1);
  });
});
