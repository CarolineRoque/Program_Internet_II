var express = require('express');
var http = require('http');
var bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
       next();
 });

http.createServer( app ).listen(8001, () => {
    console.log('Servidor iniciado em http://localhost:8001/');
});

var filmes = [];

app.post('/filmes', (req, res) =>{
    cod = req.body.cod;
    nome = req.body.nome;
    ano = req.body.ano;

    filmes.push({cod, nome, ano});

    res.status(200).send("adicionado com sucesso"); 
});

app.get('/filmes', (req, res) =>{
    res.status(200).send(filmes);
});

app.get('/filmes/:cod', (req, res) =>{
    var achou = false;
    var filmeEncontrada = "";
    cod = req.params.cod;
    filmes.forEach(function(filme, chave){
        if(cod == filme.cod){
            filmeEncontrada = filme;
            achou = true;
        }
    })

    if(achou){
        res.status(200).send(filmeEncontrada);
    } else {
        res.status(200).send("Nenhum registro encontrado");
    }

});

app.delete('/filmes/:cod', (req, res) =>{
    let deletado = false;
    cod = req.params.cod;
    filmes.forEach(function(filme, chave){
        if(cod == filme.cod){
            filmes.splice(chave, 1);
            deletado = true;
        }
    })

    if(deletado) {
        res.status(200).send("excluido com sucesso");
    } else {
        res.status(404).send("Nenhum registro excluído");
    }
});

app.put('/filmes/:cod', (req, res) =>{

    cod = req.params.cod;
    filmes.forEach(function(filme, chave){
        if(cod == filme.cod){
            nome = req.body.nome;
            ano = req.body.ano;
            filmes.splice(chave, 1);
            filmes.push({cod, nome, ano});
        }
    })

    res.status(200).send("Editado com sucesso");
});