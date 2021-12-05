/* eslint-disable no-undef */
import * as service from '../../src/services/recommendationsService.js';

describe('GET /recommendations', () => {
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
