const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "elai",
    database: "db_sample",
});

// Home
app.get("/", (req, res) => {
    console.log(req.query);
    res.send("hello");
});

app.get("/display-user", (req, res) => { 
    // querry display database
    connection.query(
        "SELECT * FROM `tbl_list1`",
            function (err, results) {
            console.log(results);
            res.json(results);})
});

// Insert
app.post("/add-user", (req, res) => {
    const { fname, lname, cnum, address1, address2, email } = req.body;
    // query insert to database
    connection.query(
        "INSERT INTO tbl_list1 (id, firstName, lastName, Phone, Address1, Address2, Email) VALUES (?,?,?,?,?,?,?)  ",
        [id, firstName, lastName, Phone, Address1, Address2, Email]); 
});

// Update
app.post("/update-user", (req, res) => {
    const { column, change, id } = req.body;
    // query insert to database
    connection.query(
        "UPDATE tbl_list1 SET firstName = ? WHERE id = ?; ",
        [change, id]); 
});

// DELETE
app.post("/delete-user", (req, res) => {
    const { id } = req.body;;
    // query insert to database
    connection.query(
        "DELETE FROM tbl_list1 WHERE id = ?",
        [id]); 
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


