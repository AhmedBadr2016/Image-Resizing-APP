import supertest from 'supertest';
import image from '../routes/myroute';
const request = supertest(image);

describe('Test endpoint responses', () => {
  it('test expect to fail', async () => {
    const response = await request.get('/images?filename=fjord');
    expect(response.status).toEqual(200);
  });
});
