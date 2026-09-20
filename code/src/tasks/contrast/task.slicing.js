import Range from '../../utils/utils.range.js'

const MIN = 1
const MAX = 255

function TSlicing (lmin, lmax) {

  function Slice (color) {
    let { red   } = color
    let { green } = color
    let { blue  } = color
    let gray = (red + green + blue) / 3

    let min = MIN + (lmin / 100) * (MAX - MIN)
    let max = MIN + (lmax / 100) * (MAX - MIN)

    return (
      gray < min && MIN ||
      gray > max && MIN ||
      MAX
    )
  }

  return function (image) {
    let [mx, my] = image.mdata ()

    for (let y of Range (0, my)) {
      for (let x of Range (0, mx)) {
        let color     = image.get (x, y)
        let { alpha } = color
        let value     = Slice (color)

        let red   = value
        let green = value
        let blue  = value

        image.set (x, y, { red, green, blue, alpha })
      }
    }

    return image
  }
}

export default TSlicing

