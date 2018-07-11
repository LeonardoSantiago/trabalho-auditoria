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

function getDriver(callback) {
  connection.query("SELECT * FROM Clientes",
    function (err, rows) {
      //here we return the results of the query
      callback(err, rows);
    }
  );
}

function getAuthentication(cpf, senha, callback) {
  connection.query(`SELECT * FROM Users WHERE CPF = '${cpf}' AND Senha = (SHA1('${senha}')) LIMIT 1`,
    function (err, rows) {
      //here we return the results of the query
      callback(err, rows);
    })
}

router.post('/authentication', function (req, res, next) {
  const senha = req.body.senha.substring(0, 150);
  const cpf = req.body.cpf.substring(0, 11);
  getAuthentication(cpf, senha, (err, results) => {
    if (err || results === '[]') {
      console.log(err)
      res.render('error');
    }
    else {
      res.render('login', { title: 'Express', user: results[0], goTo: `http://localhost:3000/clients/${results[0].Role}` });
    }
  });
});


/* GET home page. */
router.get('/', function (req, res, next) {
  getDriver((err, driveResult) => {
    if (err)
      res.render('index', { title: 'Express', clients: err })
    else
      res.render('index', { title: 'Express', clients: driveResult })
  })
});

module.exports = router;