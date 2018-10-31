var express = require('express')
var http = require('http')
var pug = require('pug')
var fs = require('fs')
var formidable = require('formidable')
var logger = require('morgan')
var jsonfile = require('jsonfile')

var myBD = 'files.json'

var app = express()

app.use(logger('dev'))
app.use('/uploads', express.static(__dirname + '/uploads'))

/*
 * GET /
 */
app.get('/', (req, res) => {
    jsonfile.readFile(myBD, (erro, dados) => {
        if (!erro) {
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            res.write(pug.renderFile('templates/index.pug', {
                files: dados
            }))
            res.end()
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            res.write(pug.renderFile('templates/erro.pug', {
                e: 'Erro na leitura da BD'
            }))
            res.end()
        }
    })
})

/*
 * GET /w3.css
 */
app.get('/w3.css', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/css'
    })
    fs.readFile('stylesheets/w3.css', (erro, dados) => {
        if (!erro) res.write(dados)
        else res.write(pug.renderFile('templates/erro.pug', {
            e: erro
        }))
        res.end()
    })
})

/*
 * POST /processaForm
 */
app.post('/processaForm', (req, res) => {
    var form = new formidable.IncomingForm()

    form.parse(req, (erro, fields, files) => {
        var fenviado = files.ficheiro.path
        var fnovo = './uploads/' + files.ficheiro.name

        var dados = {
            id: fields.id,
            name: files.ficheiro.name,
            desc: fields.desc
        }

        fs.rename(fenviado, fnovo, erro => {
            if (!erro) {
                jsonfile.readFile(myBD, (erro, ficheiros) => {
                    if (!erro) {
                        ficheiros.push(dados)
                        console.dir(ficheiros)
                        jsonfile.writeFile(myBD, ficheiros, erro => {
                            if (erro) console.log(erro)
                            else console.log('Ficheiro recebido e guardado com sucesso!')
                        })
                        res.redirect('back')
                        res.end()
                    } else {
                        res.write(pug.renderFile('templates/erro.pug', {
                            e: 'Erro ao ler o ficheiro!'
                        }))
                        res.end()
                    }
                })
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/html; charset=utf-8'
                })
                res.write(pug.renderFile('templates/erro.pug', {
                    e: 'Erro ao carregar o ficheiro!'
                }))
                res.end()
            }
        })
    })
})

/*
 * Create Server
 */
var myServer = http.createServer(app)

/*
 * Configure listen port
 */
myServer.listen(4007, () => {
    console.log('Servirdor à escuta na porta 4007...')
})