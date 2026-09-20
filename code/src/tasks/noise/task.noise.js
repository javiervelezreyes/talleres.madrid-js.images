import Range    from '../../utils/utils.range.js'
import Limits   from '../../utils/utils.limits.js'
import Gaussian from '../../utils/utils.gaussian.js'

const MIN = 0
const MAX = 255

let Limit = Limits (MIN, MAX)

function TNoise (mean, sigma) {
  return function TNoise (image) {
    let [mx, my] = image.mdata ()

    function Noise (x) {
      return Limit (x + mean + Gaussian () * sigma) | 0
    }

    for (let y of Range (0, my)) {
      for (let x of Range (0, mx)) {
        let color     = image.get (x, y)
        let { red   } = color
        let { green } = color
        let { blue  } = color
        let { alpha } = color

        red   = Noise (red)
        green = Noise (green)
        blue  = Noise (blue)

        image.set (x, y, { red, green, blue, alpha })
      }
    }

    return image
  }
}

export default TNoise