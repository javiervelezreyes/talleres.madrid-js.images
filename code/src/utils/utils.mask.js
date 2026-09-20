function Mask (data) {

  function getX () {
    return data[0].length
  }

  function getY () {
    return data.length
  }

  function get (x, y) {
    return data[y][x]
  }

  return { get, getX, getY }
}

export default Mask