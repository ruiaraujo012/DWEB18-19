var express = require('express')
var router = express.Router()
var fs = require('fs')
var jsonfile = require('jsonfile')
var formidable = require('formidable')

var myBD = './docs/files.json'

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Files App'
  });
});

/* GET files from json file. */
router.get('/file', (req, res) => {
  jsonfile.readFile(myBD, (erro, files) => {
    if (!erro) {
      res.render('linha', {
        linhas: files
      })
    } else {
      res.render('error', {
        e: erro
      })
    }
  })
})

/* POST files on json file. */
router.post('/file/save', (req, res) => {
  var form = new formidable.IncomingForm()

  form.parse(req, (erro, fields, files) => {
    var fenviado = files.file.path
    var fnovo = './public/uploads/' + files.file.name

    var dados = {
      name: files.file.name,
      desc: fields.desc
    }
    fs.rename(fenviado, fnovo, erro => {
      if (!erro) {
        jsonfile.readFile(myBD, (erro, files) => {
          if (!erro) {
            files.push(dados)
            jsonfile.writeFile(myBD, files, erro => {
              if (erro) console.log(erro)
              else {
                console.log('Ficheiro recebido e guardado com sucesso!')
                res.json(dados)
              }
            })
          } else {
            res.render('erro', {
              e: 'Erro ao ler o ficheiro!'
            })
          }
        })
      } else {
        res.render('erro', {
          e: 'Erro ao carregar o ficheiro!'
        })
      }
    })
  })
})

module.exports = router;