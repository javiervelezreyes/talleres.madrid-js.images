import Range from '../../../utils/utils.range.js'

const MAX = 255
const K   = MAX / Math.log (1 + MAX)

function TLog (image) {
  let [mx, my] = image.mdata ()

  function Log (x) {
    return K * Math.log (1 + x) | 0
  }

  for (let y of Range (0, my)) {
    for (let x of Range (0, mx)) {
      let color     = image.get (x, y)
      let { red   } = color
      let { green } = color
      let { blue  } = color
      let { alpha } = color

      red   = Log (red)
      green = Log (green)
      blue  = Log (blue)

      image.set (x, y, { red, green, blue, alpha })
    }
  }

  return image
}

export default TLog