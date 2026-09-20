import Range  from '../../../utils/utils.range.js'
import Limits from '../../../utils/utils.limits.js'
import TMean  from './task.mean.js'

const MIN = 0
const MAX = 255

function TUnsharp (size, factor) {
  return function (image) {
    let [mx, my] = image.mdata ()
    let source   = image.clone ()
    let BImage   = image.execute (TMean (size))
    let limits   = Limits (MIN, MAX)

    function Inspect (x, y) {
      let oPixel = source.get (x, y)
      let bPixel = BImage.get (x, y)

      let red   = oPixel.red   + factor * (oPixel.red   - bPixel.red)
      let green = oPixel.green + factor * (oPixel.green - bPixel.green)
      let blue  = oPixel.blue  + factor * (oPixel.blue  - bPixel.blue)
      let alpha = oPixel.alpha

      return {
        red   : limits (red)   | 0,
        green : limits (green) | 0,
        blue  : limits (blue)  | 0,
        alpha : limits (alpha) | 0
      }
    }

    for (let y of Range (0, my)) {
      for (let x of Range (0, mx)) {
        let sharp = Inspect (x, y)

        let { red   } = sharp
        let { green } = sharp
        let { blue  } = sharp
        let { alpha } = sharp

        image.set (x, y, { red, green, blue, alpha })
      }
    }

    return image
  }
}

export default TUnsharp