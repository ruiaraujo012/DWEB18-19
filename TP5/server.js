var http = require("http");
var url = require("url");
var fs = require("fs");
var pug = require("pug");

var partURL = /\/part\//;
var estilo = /\/w3.css/;

http
  .createServer((req, res) => {
    var baseURL = url.parse(req.url);

    if (baseURL.pathname == "/" || baseURL.pathname == "/index") {
      res.writeHead(200, { "Content-Type": "text/html" });
      fs.readFile("json/index.json", "utf-8", (erro, dados) => {
        if (!erro) {
          res.write(
            pug.renderFile("templates/index.pug", { tipos: JSON.parse(dados) })
          );
        } else res.write("<p><b>Erro: </b> " + erro + "</p>");

        res.end();
      });
    } else if (partURL.test(baseURL.pathname)) {
      var ficheiro = baseURL.pathname.split("/")[2];
      console.log(ficheiro);
      res.writeHead(200, { "Content-Type": "text/html" });
      fs.readFile("json/" + ficheiro + ".json", (erro, dados) => {
        if (!erro)
          res.write(
            pug.renderFile("templates/individualPages.pug", {
              insts: JSON.parse(dados)
            })
          );
        else res.write("<p><b>Erro: </b> " + erro + "</p>");

        res.end();
      });
    } else if (estilo.test(baseURL.pathname)) {
      res.writeHead(200, { "Content-Type": "text/css" });
      fs.readFile("estilo/w3.css", (erro, dados) => {
        if (!erro) res.write(dados);
        else res.write("<p><b>Erro: </b> " + erro + "</p>");

        res.end();
      });
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(
        "<p><b>Erro: Pedido desconhecido: </b> " + baseURL.pathname + "</p>"
      );
      res.end();
    }
  })
  .listen(5000, () => {
    console.log("Servidor à escuta na porta 5000...");
  });
