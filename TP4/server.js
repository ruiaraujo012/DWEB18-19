var http = require('http')
var fs = require('fs')
var url = require('url')

http.createServer((req, res) => {
    var myObj = url.parse(req.url, true)
    res.writeHead(200, { 'Content-Type': 'text/html' })

    if (myObj.pathname === '/' || myObj.pathname === '/index') {
        fs.readFile('index', (erro, dados) => {
            if (!erro)
                res.write(dados)
            else
                res.write('<p><b>ERRO: </b>' + erro + '</p>')
            res.end()
        })
    } else {
        var strURL =  myObj.pathname.substring(1, myObj.pathname.length)
        fs.readFile(strURL, (erro, dados) => {
            if (!erro)
                res.write(dados)
            else
                res.write('<p><b>ERRO: </b>' + erro + '</p>')
            res.end()
        })
    }

}).listen(4000, () => {
    console.log('Servidor à escuta na porta 4000...')
})