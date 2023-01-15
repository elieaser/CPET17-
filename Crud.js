const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());

// middleware - FORM urlecondded
app.use(bodyParser.urlencoded({ extended: false }));

// middleware - parse JSON
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "elai", //sql password
  database: "db_list", //use database name
});

// insert new user
// on the postman, select the POST selection for add user and enter url (http://localhost:3000/add-user)
app.post("/add-user", (req, res) => {
  // insert query to database
  connection.query(
    "INSERT INTO tbl_list (firstName, lastName, Phone, Address1, Address2, Email) VALUES(?, ?, ?, ?, ?, ?)",
    [req.body.firstName, req.body.lastName, req.body.Phone, req.body.Address1, req.body.Address2, req.body.Email],
    (err, results) => {
      if (results?.affectedRows > 0) {
        res.json({ message: "New data has been added to the database!" });
      } else {
        res.json({ message: err });
      }
    }
  );
});

// Show all the data inside the database
//on the postman, select the GET selection for show user and enter url (http://localhost:3000/show-users)
app.get("/show-users", (req, res) => {
  connection.query(
    "SELECT * FROM tbl_list", (err, results) => {
    if (results.length > 0) {
      res.json(results);
    } else {
      res.json({ message: "No data available from the database" });
    }
  });
});

// UPDATE the selected id from the database
//on the postman, select the PUT selection for the update and enter url (http://localhost:3000/update-user)
app.put("/update-user", (req, res) => {
  if (req.body?.firstName && req.body?.lastName && req.body?.Phone && req.body?.Address1 && req.body?.Address2 && req.body?.Email) {
    connection.query(
        //update all from the database table
      "UPDATE tbl_list SET firstName =?, lastName = ?, Phone = ?, Address1 = ?, Address2 = ?, Email = ?  WHERE id = ?",
      [req.body.firstName, req.body.lastName, req.body.Phone, req.body.Address1, req.body.Address2, req.body.Email, req.body.id],
      (err, results) => {
        if (results?.affectedRows > 0) {
          res.json({ message: "All Data has been updated!" });
        } else {
          res.json({ message: err });
        }
      }
    );
  } else {
    if (req.body?.firstName) {
      connection.query(
        //update only the firstName
        "UPDATE tbl_list SET firstName = ? WHERE id = ? ",
        [req.body.firstName, req.body.id],
        (err, results) => {
          if (results?.affectedRows > 0) {
            res.json({ message: "Data has been updated!" });
          } else {
            res.json({ message: err });
          }
        }
      );
    } else if (req.body?.lastName) {
      connection.query(
        //update only the lastName
        "UPDATE tbl_list SET lastName = ? WHERE id = ? ",
        [req.body.lastName, req.body.id],
        (err, results) => {
          if (results?.affectedRows > 0) {
            res.json({ message: "Data has been updated!" });
          } else {
            res.json({ message: err });
          }
        }
      );
    } else if (req.body?.phone) {
        connection.query(
            //update only the phone
            "UPDATE tbl_list SET Phone = ? WHERE id = ?",
            [req.body.phone, req.body.id],
            (err, results) => {
                if (results?.affectedRows > 0) {
                    res.json({message: "Data has been updated!"});
                } else {
                    res.json({message:err})
                }
            }
        );
    } else if (req.body?.address1) {
        connection.query(
            //update only the address1
            "UPDATE tbl-list SET Address1 = ? WHERE id = ?",
            [req.body.address1, req.body.id],
            (err, results) => {
                if (results?.affectedRows > 0) {
                    res.json({message: "Data has been updated!"});
                } else {
                    res.json({message:err})
                }
            }
        );
    } else if (req.body?.address2) {
        connection.query (
            //update only the address2
            "UPDATE tbl_list SET Address2 = ? WHERE id = ?",
            [req.body.address2, req.body.id],
            (err, results) => {
                if(results?.affectedRows > 0) {
                    res.json({message: "Data has been updated"});
                } else {
                    res.json({message:err})
                }
            }
        );
    } else if (req.body?.email) {
        connection.query (
            //update only the email
            "UPDATE tbl_list SET Email = ? WHERE id = ?",
            [req.body.email, req.body.id],
            (err, results) => {
                if (results?.affectedRows > 0) {
                    res.json({message: "Data has been updated"});
                } else {
                    res.json({message:err})
                }
            }
        );
    }
  }
});

// DELETE all data within the id
app.delete("/delete-user", (req, res) => {
  connection.query(
    "DELETE FROM tbl_list WHERE id = ?",
    [req.body.id],
    (err, results) => {
      if (results.affectedRows > 0) {
        res.json({ message: "Selected Data has been deleted!" });
      } else {
        res.json({ message: err });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});