import Limits from './utils.limits.js'

const { floor } = Math
const MIN = 0
const MAX = 255

function Bilinear (image) {
  let [mx, my] = image.mdata ()
  let limits   = Limits (MIN, MAX)

  return function (x, y) {

    if (x < 0 || x >= mx - 1 || y < 0 || y >= my - 1) {
      return { red: 0, green: 0, blue: 0, alpha: 0 }
    }

    let x0 = floor (x)
    let y0 = floor (y)
    let x1 = x0 + 1
    let y1 = y0 + 1

    let dx = x - x0
    let dy = y - y0

    let p00 = image.get (x0, y0)
    let p10 = image.get (x1, y0)
    let p01 = image.get (x0, y1)
    let p11 = image.get (x1, y1)

    let w00 = (1 - dx) * (1 - dy)
    let w10 = dx       * (1 - dy)
    let w01 = (1 - dx) * dy
    let w11 = dx       * dy

    let red   = p00.red   * w00 + p10.red   * w10 + p01.red   * w01 + p11.red   * w11
    let green = p00.green * w00 + p10.green * w10 + p01.green * w01 + p11.green * w11
    let blue  = p00.blue  * w00 + p10.blue  * w10 + p01.blue  * w01 + p11.blue  * w11
    let alpha = p00.alpha * w00 + p10.alpha * w10 + p01.alpha * w01 + p11.alpha * w11

    return {
      red   : limits (red   | 0),
      green : limits (green | 0),
      blue  : limits (blue  | 0),
      alpha : limits (alpha | 0)
    }
  }
}

export default Bilinear