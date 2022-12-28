import fs from 'fs'
import path from 'path'

let image_path = path.resolve(__dirname)
let mainpath = fs.readdirSync(image_path)

// loop 10 times to get the images folder

for (let x = 0; x < 10; x++) {
  if (mainpath.includes('images')) {
    console.log('when find images folder')
    console.log(image_path)

    image_path = path.resolve(image_path + '/images')
    console.log(image_path)
    break
  } else {
    image_path = path.resolve(image_path + '/..')
    mainpath = fs.readdirSync(image_path)
    console.log('when not find images folder')
    console.log(image_path)
  }
  console.log(image_path)
}
export default image_path
