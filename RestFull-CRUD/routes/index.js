var express = require('express');
var router = express.Router();
const sql = require('mssql')

const config = {
  user: '4DD_09',  //Vostro user name
  password: 'xxx123##', //Vostra password
  server: "213.140.22.237",  //Stringa di connessione
  database: '4DD_09', //(Nome del DB)
}

let executeQuery = function (res, query, next, pagina) {
  sql.connect(config, function (err) {
    if (err) { //Display error page
      console.log("Error while connecting database :- " + err);
      res.status(500).json({success: false, message:'Error while connecting database', error:err});
      return;
    }
    var request = new sql.Request(); // create Request object
    request.query(query, function (err, result) { //Display error page
      if (err) {
        console.log("Error while querying database :- " + err);
        res.status(500).json({success: false, message:'Error while querying database', error:err});
        sql.close();
        return;
      }
      //res.render('listaunita', {unit:result.recordset}); //Il vettore con i dati è nel campo recordset (puoi loggare result per verificare)
      renderizza(pagina, res, result.recordset);
      sql.close();
    });

  });
}
renderizza = function(pagina, res, dati)
{
    res.render(pagina, {unita: dati})
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/listaunita', function (req, res, next) {
  let sqlQuery = "select * from dbo.[cr-unit-attributes]";
  executeQuery(res, sqlQuery, next, "listaunita");
});

router.get('/unit/:name', function (req, res, next) {
  let sqlQuery = `select * from dbo.[cr-unit-attributes] where Unit = '${req.params.name}'`;
  executeQuery(res, sqlQuery, next, "unit");
});

router.get('/index', function(req, res, next) {
  res.render('index');
});


module.exports = router;
