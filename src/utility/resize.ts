import sharp from 'sharp';
// resizing function
const resizefun = async (
  height: number,
  width: number,
  inputpath: string,
  outputpath: string
): Promise<void> => {
  await sharp(inputpath).resize({ height, width }).toFile(outputpath);
  console.log('resizing is done');
};

export default resizefun;
