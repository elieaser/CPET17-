const express = require("express"); //modules
const app = express();
const mysql = require("mysql2");
const port = 3000;

//end point
app.get("/", (req, res) => {    
  console.log(req.query);
  res.send(`Hello!`);
});  

     // connect to database
     
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "elai",
    database: "db_JCRED",
  });
  
 //endpoint
app.get("/add-user", (req, res) => {
    console.log(req.query);    // The log() method writes (logs) a message to the console.
    connection.query(         // // query insert to database
      "INSERT INTO tbl_student (firstName, lastname, Phone, Address1, Address2, Email) VALUES (?,?,?,?,?,?)  ",
      [req.query.firstName, req.query.lastName, req.query.Phone, req.query.Address1, req.query.Address2, req.query.Email]); 
    connection.query(
      "SELECT * FROM tbl_student",
          function (err, results) {
          console.log(results);
          res.json(results);})
  });


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });