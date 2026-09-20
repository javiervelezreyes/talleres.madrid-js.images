import Range from './utils.range.js'

const { min, max } = Math

function Kernel (image, mask) {
  let [mx, my] = image.mdata ()
  let DIMX     = mask.getX ()
  let DIMY     = mask.getY ()
  let MX       = (DIMX / 2) | 0
  let MY       = (DIMY / 2) | 0

  function get (x, y) {
    let XMin = max (0     , x - MX)
    let XMax = min (mx - 1, x + MX)
    let YMin = max (0     , y - MY)
    let YMax = min (my - 1, y + MY)

    let pixels = []
    for (let idy of Range (YMin, YMax + 1)) {
      let maskY = idy - (y - MY)
      for (let idx of Range (XMin, XMax + 1)) {
        let maskX  = idx - (x - MX)
        let weight = mask.get (maskX, maskY)
        let pixel  = image.get (idx, idy)
        pixels.push ({ pixel, weight })
      }
    }

    return pixels
  }

  return { get }
}

export default Kernel