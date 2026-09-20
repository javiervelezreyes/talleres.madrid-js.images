import Range    from '../../utils/utils.range.js'
import Bilinear from '../../utils/utils.bilinear.js'

function TScale (factor) {
  return function (image) {
    let source   = image.clone ()
    let Resolve  = Bilinear (source)
    let [mx, my] = image.mdata ()

    function Inspect (x, y) {
      let sx = x / factor
      let sy = y / factor
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

export default TScale