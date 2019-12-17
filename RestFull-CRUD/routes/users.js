var express = require('express');
var router = express.Router();
const sql = require('mssql');

const config = {
  user: '4DD_09',  //Vostro user name
  password: 'xxx123##', //Vostra password
  server: "213.140.22.237\\sqlexpress",  //Stringa di connessione
  database: 'wtSchool', //(Nome del DB)
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  sql.connect(config, err => {
    if(err) console.log(err);  // ... error check
    
    // Query
    let sqlRequest = new sql.Request();  //Oggetto che serve a creare le query
    sqlRequest.query('select * from school.Person', (err, result) => {
        if (err) console.log(err); // ... error checks
        res.send(result);  //Invio il risultato
    });
  });
});

module.exports = router;
