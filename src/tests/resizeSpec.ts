import image_path from '../utility/images_path';
import resizefun from '../utility/resize';
import fs from 'fs';

describe('Test endpoint responses', () => {
  it('test expect to pass', async () => {
    resizefun(
      1000,
      800,
      `${image_path}/fjord.jpg`,
      `${image_path}/cashing/fjord_resize1000x800.jpg`
    );
    expect(
      fs.existsSync(`${image_path}/cashing/fjord_resize1000x800.jpg`)
    ).toBeTruthy();
  });
});
