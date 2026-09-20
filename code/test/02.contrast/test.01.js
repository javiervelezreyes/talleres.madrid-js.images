import Reader    from '../../src/core/core.reader.js'
import TBinarize from '../../src/tasks/contrast/task.binarize.js'

const XI = './test/images/in/image.x.jpg'
const YI = './test/images/in/image.y.jpg'
const XO = './test/images/out/image.x.jpg'
const YO = './test/images/out/image.y.jpg'

let IX = await Reader.read (XI)
let IY = await Reader.read (YI)

let TX = IX.execute (TBinarize (30))
let TY = IY.execute (TBinarize (45))

await TX.write (XO)
await TY.write (YO)