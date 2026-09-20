import Reader from '../../src/core/core.reader.js'
import Noise  from '../../src/tasks/bright/mask/task.xor.js'

const XI = './test/images/in/image.x.jpg'
const YI = './test/images/in/image.y.jpg'
const XO = './test/images/out/image.x.jpg'
const YO = './test/images/out/image.y.jpg'

let IX = await Reader.read (XI)
let IY = await Reader.read (YI)

let TX = IX.execute (Noise (20, 10))
let TY = IY.execute (Noise (20, 10))

await TX.write (XO)
await TY.write (YO)