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

var pessoas = [];

app.post('/pessoas', (req, res) =>{
    cpf = req.body.cpf;
    nome = req.body.nome;
    telefone = req.body.telefone;

    pessoas.push({cpf, nome, telefone});

    res.status(200).send("adicionado com sucesso"); 
});

app.get('/pessoas', (req, res) =>{
    res.status(200).send(pessoas);
});

app.get('/pessoas/:cpf', (req, res) =>{
    var achou = false;
    var pessoaEncontrada = "";
    cpf = req.params.cpf;
    pessoas.forEach(function(pessoa, chave){
        if(cpf == pessoa.cpf){
            pessoaEncontrada = pessoa;
            achou = true;
        }
    })

    if(achou){
        res.status(200).send(pessoaEncontrada);
    } else {
        res.status(200).send("Nenhum registro encontrado");
    }

});

app.delete('/pessoas/:cpf', (req, res) =>{
    let deletado = false;
    cpf = req.params.cpf;
    pessoas.forEach(function(pessoa, chave){
        if(cpf == pessoa.cpf){
            pessoas.splice(chave, 1);
            deletado = true;
        }
    })

    if(deletado) {
        res.status(200).send("excluido com sucesso");
    } else {
        res.status(404).send("Nenhum registro excluído");
    }
});

app.put('/pessoas/:cpf', (req, res) =>{

    cpf = req.params.cpf;
    pessoas.forEach(function(pessoa, chave){
        if(cpf == pessoa.cpf){
            nome = req.body.nome;
            telefone = req.body.telefone;
            pessoas.splice(chave, 1);
            pessoas.push({cpf, nome, telefone});
        }
    })

    res.status(200).send("Editado com sucesso");
});