const http = require("http")

function sitioWeb(req, res){
    // res.writeHead(200, {"Content-type": "text/plain"})
    // res.end("Primer Servidor...")
    res.writeHead(200, {"Content-type": "text/html"})
    res.end("<b>Primer</b> Servidor...")
}

let servidor = http.createServer(sitioWeb)

servidor.listen(420, "192.168.0.18") // ip local
// servidor.listen(420, "127.0.0.1")

console.log("Node Server corriendo...") 



// https://www.youtube.com/watch?v=zBk-Hyv6ykw