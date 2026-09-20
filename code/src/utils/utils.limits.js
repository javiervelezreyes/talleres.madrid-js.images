function Limits (min, max) {
  return function (x) {
    return (
      x < min ? min :
      x > max ? max :
      x
    )
  }
}


export default Limits