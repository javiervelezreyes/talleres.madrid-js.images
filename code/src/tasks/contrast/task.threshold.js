import Range from '../../utils/utils.range.js'

const MIN = 0
const MAX = 255

function TTheshold (levels) {
  return function (image) {
    let [mx, my] = image.mdata ()

    function Inspect (color) {
      let { red   } = color
      let { green } = color
      let { blue  } = color
      let gray = (red + green + blue) / 3
      
      let idx   = 0
      let max   = levels.length
      let found = false 
      let level
      let value
      while (idx < max && !found) { 
        level = MIN + (levels[idx] / 100) * (MAX - MIN)
        found = gray < level
        value = MIN + ((MAX - MIN) * idx / max) | 0
        idx++
      } 
      return (
         found && value ||
        !found && MAX   ||
         value
      )
    }

    for (let y of Range (0, my)) {
      for (let x of Range (0, mx)) {
        let color     = image.get (x, y)
        let { alpha } = color
        let value     = Inspect (color)

        let red   = value
        let green = value
        let blue  = value

        image.set (x, y, { red, green, blue, alpha })
      }
    }

    return image
  }
}

export default TTheshold