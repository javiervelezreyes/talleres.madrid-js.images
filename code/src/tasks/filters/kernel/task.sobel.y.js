import TKernel from './task.kernel.js'
import MSobelY from './masks/mask.sobel.y.js'

function TSobelY (image) {
  return TKernel (MSobelY)(image)
}

export default TSobelY