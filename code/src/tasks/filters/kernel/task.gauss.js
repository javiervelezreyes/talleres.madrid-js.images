import TKernel from './task.kernel.js'
import MGauss  from './masks/mask.gauss.js'

function TSmooth (image) {
  return TKernel (MGauss)(image)
}

export default TSmooth