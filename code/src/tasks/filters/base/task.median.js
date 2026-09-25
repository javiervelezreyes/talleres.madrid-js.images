import Range from '../../../utils/utils.range.js'
import Box   from '../../../utils/utils.box.js'

let Sort = (x, y) => x - y

function TMedian (size) {
  return function (image) {
    let [mx, my] = image.mdata ()
    let box      = Box (image, size)

    function Inspect (x, y) {
      let pixels = box.get (x, y)
      let middle = (pixels.length / 2) | 0
      
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
      reds  .sort (Sort)
      greens.sort (Sort)
      blues .sort (Sort)
      alphas.sort (Sort)

      return {
        red   : reds  [middle],
        green : greens[middle],
        blue  : blues [middle],
        alpha : alphas[middle]
      }
    }

    for (let y of Range (0, my)) {
      for (let x of Range (0, mx)) {
        let median = Inspect (x, y)
        
        let { red   } = median
        let { green } = median
        let { blue  } = median
        let { alpha } = median

        image.set (x, y, { red, green, blue, alpha })
      }
    }

    return image
  }
}

export default TMedian