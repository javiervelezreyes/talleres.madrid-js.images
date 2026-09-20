import Range from '../../utils/utils.range.js'

const MIN = 0
const MAX = 255

function TClipping (lmin, lmax) {
  return function (image) {
    let [mx, my] = image.mdata ()
    
    function Clip (x) {
      let min = MIN + (MAX - MIN) * lmin / 100
      let max = MIN + (MAX - MIN) * lmax / 100
      return (
        (x < min) && MIN ||
        (x > max) && MAX ||
         x
      )
    }

    for (let y of Range (0, my)) {
      for (let x of Range (0, mx)) {
        let color     = image.get (x, y)
        let { red   } = color
        let { green } = color
        let { blue  } = color
        let { alpha } = color

        red   = Clip (red)
        green = Clip (green)
        blue  = Clip (blue)

        image.set (x, y, { red, green, blue, alpha })
      }
    }

    return image
  }
}

export default TClipping