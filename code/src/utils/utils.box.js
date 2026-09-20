import Range from './utils.range.js'

const { min } = Math
const { max } = Math

function Box (image, size) {
  
  function get (x, y) {
    let [mx, my] = image.mdata ()
    let pixels   = []
    
    let XMin = max (0     , x - size)
    let XMax = min (mx - 1, x + size)
    let YMin = max (0     , y - size)
    let YMax = min (my - 1, y + size)

    for (let idy of Range (YMin, YMax + 1)) {
      for (let idx of Range (XMin, XMax + 1)) {
        pixels.push (image.get (idx, idy))
      }
    }
    return pixels
  }
  
  return { get }
}

export default Box