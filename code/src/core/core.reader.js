import { Jimp } from 'jimp'
import Image    from './core.image.js'

function Reader () {

  async function read (path) {
    let data  = await Jimp.read (path)
    let image = Image (data)
    return image
  }

  return { read }

}


export default Reader ()