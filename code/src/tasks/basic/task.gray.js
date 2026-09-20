import Range from '../../utils/utils.range.js'

const RED   = .299
const GREEN = .587
const BLUE  = .114

function TGray (image) {
  let [mx, my] = image.mdata ()

  function Gray (k, x) {
    return k * x
  }

  for (let y of Range (0, my)) {
    for (let x of Range (0, mx)) {
      let color     = image.get (x, y)
      let { red   } = color
      let { green } = color
      let { blue  } = color
      let { alpha } = color
      let gray

      red   = Gray (RED,   red)
      green = Gray (GREEN, green)
      blue  = Gray (BLUE,  blue)

      gray  = (red + green + blue) | 0

      red   = gray
      green = gray
      blue  = gray

      image.set (x, y, { red, green, blue, alpha })
    }
  }

  return image
}

export default TGray