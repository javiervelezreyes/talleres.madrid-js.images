import Reader from '../../src/core/core.reader.js'
import TScale from '../../src/tasks/geometry/task.scale.js'

const XI = './test/images/in/image.x.jpg'
const YI = './test/images/in/image.y.jpg'
const XO = './test/images/out/image.x.jpg'
const YO = './test/images/out/image.y.jpg'

let IX = await Reader.read (XI)
let IY = await Reader.read (YI)

let TX = IX.execute (TScale (2))
let TY = IY.execute (TScale (2))

await TX.write (XO)
await TY.write (YO)