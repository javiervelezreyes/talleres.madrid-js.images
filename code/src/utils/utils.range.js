function* Range (min, max) {
  let idx = min
  while (idx < max) {
    yield idx
    idx++
  }
}


export default Range