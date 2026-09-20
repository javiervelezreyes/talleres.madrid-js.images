import Range from '../../utils/utils.range.js'

function TDarken (level) {
  return function (image) {
    let [mx, my] = image.mdata ()

    function Dark (x) {
      return x * (1 - level / 100) | 0
    }

    for (let y of Range (0, my)) {
      for (let x of Range (0, mx)) {
        let color     = image.get (x, y)
        let { red   } = color
        let { green } = color
        let { blue  } = color
        let { alpha } = color

        red   = Dark (red)
        green = Dark (green)
        blue  = Dark (blue)

        image.set (x, y, { red, green, blue, alpha })
      }
    }

    return image 
  }
}

export default TDarken