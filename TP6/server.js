var http = require("http");
var url = require("url");
var fs = require("fs");
var pug = require("pug");

var myServer = http.createServer((req, res) => {
  var purl = url.parse(req.url, true);

  console.log("Recebi o pedido: " + purl.pathname);
  console.log("Com o método: " + req.method);

  if (req.method == "GET") {
    if (purl.pathname == "/" || purl.pathname == "/index") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write(pug.renderFile("index.pug"));
      res.end();
    } else if (purl.pathname == "/w3.css") {
      res.writeHead(200, { "Content-Type": "text/css" });
      fs.readFile("stylesheets/w3.css", (erro, dados) => {
        if (!erro) res.write(dados);
        else res.write(pug.renderFile("erro.pug", { e: erro }));
        res.end();
      });
    }
  }
});

myServer.listen(4006, () => {
  console.log("Servirdor à escuta na porta 4006...");
});
