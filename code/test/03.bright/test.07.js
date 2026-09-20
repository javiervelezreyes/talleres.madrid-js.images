import Reader from '../../src/core/core.reader.js'
import TOr    from '../../src/tasks/bright/mask/task.or.js'

const XI = './test/images/in/image.x.jpg'
const YI = './test/images/in/image.y.jpg'
const XO = './test/images/out/image.x.jpg'
const YO = './test/images/out/image.y.jpg'

let IX = await Reader.read (XI)
let IY = await Reader.read (YI)

let TX = IX.execute (TOr (128))
let TY = IY.execute (TOr (128))

await TX.write (XO)
await TY.write (YO)