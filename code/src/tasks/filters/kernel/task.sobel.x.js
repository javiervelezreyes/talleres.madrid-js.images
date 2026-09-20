import TKernel from './task.kernel.js'
import MSobelX from './masks/mask.sobel.x.js'

function TSobelX (image) {
  return TKernel (MSobelX)(image)
}

export default TSobelX