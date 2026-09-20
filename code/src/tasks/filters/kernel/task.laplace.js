import TKernel  from './task.kernel.js'
import MLaplace from './masks/mask.laplace.js'

function TLaplace (image) {
  return TKernel (MLaplace)(image)
}

export default TLaplace