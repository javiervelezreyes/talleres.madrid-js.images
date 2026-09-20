import Range from '../../../utils/utils.range.js'

const MAX = 255
const K   = MAX / Math.log (1 + MAX)

function TExp (image) {
  let [mx, my] = image.mdata ()

  function Exp (x) {
    return Math.exp (x / K) - 1 | 0
  }

  for (let y of Range (0, my)) {
    for (let x of Range (0, mx)) {
      let color     = image.get (x, y)
      let { red   } = color
      let { green } = color
      let { blue  } = color
      let { alpha } = color

      red   = Exp (red)
      green = Exp (green)
      blue  = Exp (blue)

      image.set (x, y, { red, green, blue, alpha })
    }

  }

  return image
}

export default TExp

