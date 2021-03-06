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

function getClients(callback) {
    connection.query("SELECT * FROM Clientes",
        function (err, rows) {
            //here we return the results of the query
            callback(err, rows);
        }
    );
}



router.get('/:role', function (req, res, next) {
    getClients((err, result) => {
        if (err)
            res.render('clients', { title: 'Express', clients: err, link: 'client', goTo: 'http://localhost:3000/client-new', Role: req.params.role })
        else {
            console.log(req.params);
            res.render('clients', { title: 'Express', clients: result, link: 'client', goTo: 'http://localhost:3000/client-new', Role: req.params.role })
        }
    })
});

module.exports = router;
