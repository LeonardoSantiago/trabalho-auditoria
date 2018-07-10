var express = require('express');
const mysql = require('mysql');
var router = express.Router();

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '12345',
    database: 'trabalhoApi'
});

function formatString(string) {
    if (string[0] === '(')
        return string.replace('(', '')
    else
        return string
}

function createClient(nome, cpf, callback) {
    connection.query(`INSERT INTO Clientes(Nome, CPF) VALUES('${nome}','${cpf}')`,
        function (err, rows) {
            //here we return the results of the query
            callback(err, rows);
        }
    );
}

router.get('/', function (req, res, next) {
    res.render('client-new', { title: 'Express' })
});

router.post('/', function (req, res, next) {
    console.log(req.body.nome)
    const nome = req.body.nome.substring(0, 150);
    const cpf = req.body.CPF.substring(0, 11);
    createClient(nome, cpf, (error, rows) => {
        if (error) {
            console.log(error)
            res.render('error')
        } else
            res.redirect('clients')
    })
})

module.exports = router;
