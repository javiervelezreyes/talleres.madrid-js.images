function Gaussian () {
    let u1 = Math.random ()
    let u2 = Math.random ()

    return Math.sqrt (-2 * Math.log (u1)) *
           Math.cos  (2  * Math.PI * u2)
  }

export default Gaussian