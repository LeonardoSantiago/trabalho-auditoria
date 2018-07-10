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

function getClient(filter, callback) {
    connection.query("SELECT * from Clientes" + filter, function (err, rows) {
        callback(err, rows)
    })
}


router.get('/:id', function (req, res, next) {
    let filter = '';
    if (req.params.id) filter = ' WHERE ID=' + req.params.id;
    getClient(filter, (err, result) => {
        if (err)
            res.render('client', { title: 'Express', client: err })
        else
            console.log(result)
        res.render('client', { title: 'Express', client: result })
    })
});

module.exports = router;
