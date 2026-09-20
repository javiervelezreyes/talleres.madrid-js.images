import Reader from '../../src/core/core.reader.js'
import TMode  from '../../src/tasks/filters/base/task.mode.js'

const XI = './test/images/in/image.x.jpg'
const YI = './test/images/in/image.y.jpg'
const XO = './test/images/out/image.x.jpg'
const YO = './test/images/out/image.y.jpg'

let IX = await Reader.read (XI)
let IY = await Reader.read (YI)

let TX = IX.execute (TMode (3))
let TY = IY.execute (TMode (3))

await TX.write (XO)
await TY.write (YO)