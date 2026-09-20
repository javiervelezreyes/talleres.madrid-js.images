import Range from '../../../utils/utils.range.js'
import Box   from '../../../utils/utils.box.js'

function TMode (size) {
  return function (image) {
    let [mx, my] = image.mdata ()
    let box      = Box (image, size)

    function Mode (colors) {
      let frequency = {}
      let max       = 0
      let mode      = colors[0]

      for (let color of colors) {
        frequency[color] = (
          frequency[color] && frequency[color] + 1 ||
         !frequency[color] && 1
        )
        if (frequency[color] > max) {
          max  = frequency[color]
          mode = color
        }
      }

      return mode
    }

    function Inspect (x, y) {
      let pixels = box.get (x, y)

      let reds   = []
      let greens = []
      let blues  = []
      let alphas = []

      for (let pixel of pixels) {
        reds  .push (pixel.red)
        greens.push (pixel.green)
        blues .push (pixel.blue)
        alphas.push (pixel.alpha)
      }

      return {
        red   : Mode (reds),
        green : Mode (greens),
        blue  : Mode (blues),
        alpha : Mode (alphas)
      }
    }

    for (let y of Range (0, my)) {
      for (let x of Range (0, mx)) {
        let mode = Inspect (x, y)
        
        let { red   } = mode
        let { green } = mode
        let { blue  } = mode
        let { alpha } = mode

        image.set (x, y, { red, green, blue, alpha })
      }
    }

    return image
  }
}

export default TMode