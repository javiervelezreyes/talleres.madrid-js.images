import Range from '../../utils/utils.range.js'

const MIN = 0
const MAX = 255

function TBinarize (level) {
  return function (image) {
    let [mx, my] = image.mdata ()

    function Inspect (color) {
      let { red   } = color
      let { green } = color
      let { blue  } = color
      let gray = (red + green + blue) / 3
      let max  = MIN + (MAX - MIN) * level / 100
      return (
        gray > max && MAX ||
        gray < max && MIN ||
        gray
      )
    }

    for (let y of Range (0, my)) {
      for (let x of Range (0, mx)) {
        let color     = image.get (x, y)
        let { alpha } = color
        let binary    = Inspect (color)

        let red   = binary
        let green = binary
        let blue  = binary

        image.set (x, y, { red, green, blue, alpha })
      }
    }

    return image
  }
}

export default TBinarize