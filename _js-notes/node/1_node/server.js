// https://www.youtube.com/playlist?list=PL0Zuz27SZ-6PFkIxaJ6Xx_X46avTM1aYw

// 1) Node runs on a server - not in a browser (backend not frontend)
// 2) The console is the terminal window
console.log("HELLO SERVER >:D")
// 3) global object instead of window object
    // console.log(global)
// 4) Has common Core modules
// 5) CommonJS modules instad of ES5 modules
    // ES6:: import { name, asdf } from './modules/qwer.js';
    // CommonJS
    const os = require("os")
    const path = require("path")

    console.log("os.type       ::" + os.type())
    console.log("os.version    ::" + os.version())
    console.log("os.homedir    ::" + os.homedir())
    console.log("os.hostname   ::" + os.hostname())

    console.log("")
    
    console.log("__dirname     ::" + __dirname)
    console.log("__filename    ::" + __filename)

    console.log("")
    
    console.log("path.dirname(__filename)     ::" + path.dirname(__filename))
    console.log("path.basename(__filename)    ::" + path.basename(__filename))
    console.log("path.extname(__filename)     ::" + path.extname(__filename))
    
    console.log("")

    console.log(path.parse(__filename))


    // lo mismo abajo 
        // const math = require("./math")
        // console.log(math.add(2, 3))

    const { add, minus, multiply, divide, reminder } = require("./math")

    console.log(add(2,3))
    console.log(minus(2,3))
    console.log(multiply(2,3))
    console.log(divide(2,3))
    console.log(reminder(2,3))



// 6) Missing some JS APIs like fetch