import { intToRGBA } from 'jimp'
import { rgbaToInt } from 'jimp'

const RED   = 'red'
const GREEN = 'green'
const BLUE  = 'blue'
const ALPHA = 'alpha'

function Image (data) {

  function mdata () {
    let width  = data.width
    let height = data.height
    return [width, height]
  }

  function get (x, y) {
    let hex = data.getPixelColor (x, y)
    let { r, g, b, a } = intToRGBA (hex)
    return {
      [RED]   : r,
      [GREEN] : g,
      [BLUE]  : b,
      [ALPHA] : a,
    }
  }

  function set (x, y, color) {
    let red   = color[RED]
    let green = color[GREEN]
    let blue  = color[BLUE]
    let alpha = color[ALPHA]
    let hex = rgbaToInt (red, green, blue, alpha)
    data.setPixelColor (hex, x, y)
  }

  function clone () {
    let copy = data.clone ()
    return Image (copy)
  }

  function execute (task) {
    let copy  = data.clone ()
    let image = Image (copy)
    return task (image)
  }

  async function write (path) {
    await data.write (path)
  }

  return {
    mdata,
    get,
    set,
    clone,
    execute,
    write,
  }

}

export default Image