import Range    from '../../utils/utils.range.js'
import Bilinear from '../../utils/utils.bilinear.js'

const { sin } = Math
const { cos } = Math
const { PI  } = Math

function TRotate (factor) {
  return function (image) {
    let source   = image.clone ()
    let Resolve  = Bilinear (source)
    let [mx, my] = image.mdata ()

    let rFactor = (factor * PI) / 180
    let rCos    = cos (rFactor)
    let rSin    = sin (rFactor)
    let cx      = mx / 2
    let cy      = my / 2

    function Inspect (x, y) {
      let dx = x - cx
      let dy = y - cy
      let rx =  dx * rCos + dy * rSin
      let ry = -dx * rSin + dy * rCos
      let sx = rx + cx
      let sy = ry + cy

      return Resolve (sx, sy)
    }

    for (let y of Range (0, my)) {
      for (let x of Range (0, mx)) {
        let pixel = Inspect (x, y)

        let { red   } = pixel
        let { green } = pixel
        let { blue  } = pixel
        let { alpha } = pixel

        image.set (x, y, { red, green, blue, alpha })
      }
    }

    return image
  }
}

export default TRotate