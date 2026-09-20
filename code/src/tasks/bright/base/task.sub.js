import Range  from '../../../utils/utils.range.js'
import Limits from '../../../utils/utils.limits.js'

const MIN = 0
const MAX = 255

let Limit = Limits (MIN, MAX)

function TSub (k) {
  return function (image) {
    let [mx, my] = image.mdata ()

    function Value (x) {
      return Limit (x - k)
    }

    for (let y of Range (0, my)) {
      for (let x of Range (0, mx)) {
        let color     = image.get (x, y)
        let { red   } = color
        let { green } = color
        let { blue  } = color
        let { alpha } = color

        red   = Value (red)
        green = Value (green)
        blue  = Value (blue)

        image.set (x, y, { red, green, blue, alpha })
      }
    }

    return image
  }
}

export default TSub

