import Range from '../../../utils/utils.range.js'
import Box   from '../../../utils/utils.box.js'

function TMean (size) {
  return function (image) {
    let [mx, my] = image.mdata ()
    let box      = Box (image, size)

    function Inspect (x, y) {
      let pixels = box.get (x, y)
      let total  = pixels.length
      
      let red    = 0
      let green  = 0
      let blue   = 0
      let alpha  = 0
      for (let pixel of pixels) {
        red   = red   + pixel.red
        green = green + pixel.green
        blue  = blue  + pixel.blue
        alpha = alpha + pixel.alpha
      }

      return {
        red   :   (red / total) | 0,
        green : (green / total) | 0,
        blue  : ( blue / total) | 0,
        alpha : (alpha / total) | 0
      }
    }

    for (let y of Range (0, my)) {
      for (let x of Range (0, mx)) {
        let mean = Inspect (x, y)
        
        let { red   } = mean
        let { green } = mean
        let { blue  } = mean
        let { alpha } = mean

        image.set (x, y, { red, green, blue, alpha })
      }
    }

    return image
  }
}

export default TMean