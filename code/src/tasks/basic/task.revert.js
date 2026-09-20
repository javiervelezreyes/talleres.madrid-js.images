import Range from '../../utils/utils.range.js'

const MAX = 255

function TRevert (image) {
  let [mx, my] = image.mdata ()

  function Reverse (x) {
    return MAX - x
  }

  for (let y of Range (0, my)) {
    for (let x of Range (0, mx)) {
      let color     = image.get (x, y)
      let { red   } = color
      let { green } = color
      let { blue  } = color
      let { alpha } = color

      red   = Reverse (red)
      green = Reverse (green)
      blue  = Reverse (blue)

      image.set (x, y, { red, green, blue, alpha })
    }
  }

  return image
}

export default TRevert