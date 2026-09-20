import Range  from '../../../utils/utils.range.js'
import Limits from '../../../utils/utils.limits.js'
import Kernel from '../../../utils/utils.kernel.js'

const { abs } = Math
const MIN = 0
const MAX = 255

function TKernel (mask) {
  return function (image) {
    let [mx, my] = image.mdata ()
    let source   = image.clone ()
    let kernel   = Kernel (source, mask)
    let limits   = Limits (MIN, MAX)

    function Inspect (x, y) {
      let colors  = kernel.get (x, y)
      let red     = 0
      let green   = 0
      let blue    = 0
      let alpha   = 0
      let Weights = 0

      for (let color of colors) {
        let { pixel  } = color
        let { weight } = color
        red     = red        + pixel.red   * weight
        green   = green      + pixel.green * weight
        blue    = blue       + pixel.blue  * weight
        alpha   = alpha      + pixel.alpha * weight
        Weights = Weights + weight
      }

      let factor = (
         Weights && Weights || 
        !Weights && 1
      )

      return {
        red   : limits ((abs (red)   / factor) | 0),
        green : limits ((abs (green) / factor) | 0),
        blue  : limits ((abs (blue)  / factor) | 0),
        alpha : MAX
      }
    }

    for (let y of Range (0, my)) {
      for (let x of Range (0, mx)) {
        let res = Inspect (x, y)

        let { red   } = res
        let { green } = res
        let { blue  } = res
        let { alpha } = res

        image.set (x, y, { red, green, blue, alpha })
      }
    }

    return image
  }
}

export default TKernel