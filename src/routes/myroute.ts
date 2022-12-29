// let's begine our application
import express from 'express';
import image_path from '../utility/images_path';
import resizefun from '../utility/resize';
import fs from 'fs';

const image = express.Router();

image.get('/', async (req, res): Promise<void> => {
  const { filename, height, width } = req.query;
  const valid_filename: string = filename as unknown as string;
  // if any of heght or width are not numbers, we will ignore them
  const valid_height: number = parseInt(height as unknown as string);
  const valid_width: number = parseInt(width as unknown as string);

  if (
    fs
      .readdirSync(`${image_path}/cashing`)
      .includes(`${valid_filename}_resize${valid_height}x${valid_width}.jpg`)
  ) {
    res.sendFile(
      `${image_path}/cashing/${valid_filename}_resize${valid_height}x${valid_width}.jpg`
    );
  } else {
    if (Number.isNaN(valid_height) && Number.isNaN(valid_width)) {
      // No height nor width
      console.log('image without height & width');
      if (
        fs.readdirSync(image_path).includes(`${valid_filename}.jpg`) &&
        height == undefined &&
        width == undefined
      ) {
        // existed in images folder
        console.log('Existed in images foder');
        res.sendFile(`${image_path}/${valid_filename}.jpg`);
      } else {
        // existed in images folder
        console.log('Not existed in images foder');
        res
          .status(404)
          .send(
            'put you image in the images folder & enter the height and width as positive number'
          );
      }
    } else if (valid_height > 0 && valid_width > 0) {
      // both the height & width are positive numbers
      console.log('Both height & width are positive');
      if (fs.readdirSync(image_path).includes(`${valid_filename}.jpg`)) {
        // we found the image in images folder and ready for resizing with the desired height and width
        console.log(
          'we found the image in images folder and ready for resizing with the desired height and width'
        );
        await resizefun(
          valid_height,
          valid_width,
          `${image_path}/${valid_filename}.jpg`,
          `${image_path}/cashing/${valid_filename}_resize${valid_height}x${valid_width}.jpg`
        );
        res.sendFile(
          `${image_path}/cashing/${valid_filename}_resize${valid_height}x${valid_width}.jpg`
        );
      } else if (
        fs
          .readdirSync(`${image_path}/cashing`)
          .includes(
            `${valid_filename}_resize${valid_height}x${valid_width}.jpg`
          )
      ) {
        // if we resized the image before so no need to resize just get it
        console.log(
          'we resized the image before so no need to resize just get it'
        );
        res.sendFile(
          `${image_path}/cashing/${valid_filename}_resize${valid_height}x${valid_width}.jpg`
        );
      } else {
        // the height and width are positive numbers but the image is not found in the image folder
        console.log(
          'the height and width are positive numbers but the image is not found in the image folder'
        );
        res.status(404).send('put you image in the images folder');
      }
    } else if (
      valid_height > 0 &&
      Number.isNaN(valid_width) &&
      width == undefined
    ) {
      // the height is positive numbers & No width
      console.log('the height is positive numbers & No width');
      if (fs.readdirSync(image_path).includes(`${valid_filename}.jpg`)) {
        // Only the height is positive numbers & the image is found in the image folder
        console.log(
          'the height is positive numbers & the image is found in the image folder'
        );
        await resizefun(
          valid_height,
          valid_height,
          `${image_path}/${valid_filename}.jpg`,
          `${image_path}/cashing/${valid_filename}_resize${valid_height}x${valid_height}.jpg`
        );
        res.sendFile(
          `${image_path}/cashing/${valid_filename}_resize${valid_height}x${valid_height}.jpg`
        );
      } else {
        // Only the height is positive number but the image is not found in the image folder
        console.log(
          'Only the height is positive number but the image is not found in the image folder'
        );
        res.status(404).send('put you image in the images folder');
      }
    } else if (valid_width > 0 && height == undefined) {
      // the width is positive numbers & No height
      console.log('the width is positive numbers & No height');
      if (fs.readdirSync(image_path).includes(`${valid_filename}.jpg`)) {
        // We found the image in the images folder
        console.log('We found the image in the images folder');
        await resizefun(
          valid_width,
          valid_width,
          `${image_path}/${valid_filename}.jpg`,
          `${image_path}/cashing/${valid_filename}_resize${valid_width}x${valid_width}.jpg`
        );
        res.sendFile(
          `${image_path}/cashing/${valid_filename}_resize${valid_width}x${valid_width}.jpg`
        );
      } else {
        // Only the width is positive number but the image is not found in the image folder
        console.log(
          'Only the width is positive number but the image is not found in the image folder'
        );
        res.status(404).send('put you image in the images folder');
      }
    } else {
      // The height or the width or the two are not positive number
      console.log('The height or the width or the two are not positive number');
      res
        .status(404)
        .send(
          'http://localhost:3000/images?filename={desired_filename}&height={desired_height}&width={desired_width}'
        );
    }
  }
});

export default image;

// GoodBye (:
