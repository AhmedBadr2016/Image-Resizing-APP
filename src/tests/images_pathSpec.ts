import image_path from '../utility/images_path';
import fs from 'fs';

describe('Test endpoint responses', () => {
  it('test expect to pass', async () => {
    expect(fs.readdirSync(image_path).includes(`santamonica.jpg`));
  });
});
