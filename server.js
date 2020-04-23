const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
const cors=require('cors');

app.use(bodyparser.json());
app.use(function(request,result,next){
    result.setHeader("Access-Control-Allow-Origin","*");
    next();
});
 app.use(cors());
//     app.use(bodyparser.urlencoded({ extended: false }));
//     app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept'
//     );
//       next();
//     });
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'coom2',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(9999, () => console.log('Express server is runnig at port no : 9999'));


//Get all employees
app.get('/tb1', (req, res) => {
    mysqlConnection.query('SELECT * FROM comm', (err, results) => {
        if (err)
         console.log(err);
        else
        console.log('data send success')
        res.send(results);
    })
});

//Get an employees
app.get('/tb1/:Name', (req, res) => {
    mysqlConnection.query('SELECT * FROM tb1 WHERE Name = ?', [req.params.Name], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an employees
app.delete('/tb1/:Name', (req, res) => {
    mysqlConnection.query('DELETE FROM tb1 WHERE Name = ?', [req.params.Name], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an employees
app.post('/tb2', (req, res) => {
    let emp = req.body;
    var sql = "insert into comm values(null,"+req.body.postid+","+req.body.userid+",'"+req.body.comment+"',null)"
    mysqlConnection.query(sql, [emp.postid, emp.userid, emp.comment], (err, rows, fields) => {
        if (!err)
            
            res.send('Inserted '+ req.body.userid);
        else
           console.log(err);
    })
});

//Update an employees
app.put('/tb3', (req, res) => {
    let emp = req.body;
    var sql = "UPDATE comm SET tap = ? WHERE userid = ?"
    mysqlConnection.query(sql, [emp.tap,emp.userid], (err, rows, fields)=> {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});