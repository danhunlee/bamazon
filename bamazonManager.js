var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "dlgjs123!",
    database: "bamazon_DB"
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
  });

  // function which prompts the user for what action they should take
function start() {
    inquirer
      .prompt({
        name: "menu",
        type: "list",
        message: "What would you like to view?",
        choices: ["Products for Sale", "Low Inventory", "Add to Inventory", "Add New Product"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.menu === "Products for Sale") {
          productsForSale();
        }
        else if(answer.menu === "Low Inventory") {
          lowInventory();
        }
        else if(answer.menu === "Add to Inventory") {
          addToInventory();
        } 
        else if(answer.menu === "Add New Product") {
            addNewProduct();
        } 
        else{
          connection.end();
        }
      });
    }

    //grab the table from mysql
  function productsForSale() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.table(res)
        connection.end();
    })
  }

  function lowInventory() {
      var query = "SELECT * FROM products WHERE stock_quantity<5";
      connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
      });
    connection.end();
  } 

  function addToInventory() {
      connection.query("SELECT * FROM products", function(err, res) {
          if (err) throw err;
          inquirer.prompt([
              {
                  name: "choice",
                  type: "rawlist",
                  choices: function() {
                      var choiceArray = [];
                      for (var i = 0; i < res.length; i++) {
                          choiceArray.push(res[i].product_name);
                      }
                      return choiceArray;
                  },
                  message: "What item would you like to add more?"
              },
              {
                  name: "add",
                  type: "input",
                  message: "how much would you like to add?"
              }
          ])
          .then(function(answer) {
            var chosenItem;
            for (var i = 0; i < res.length; i++) {
              if (res[i].product_name === answer.choice) {
                chosenItem = res[i];
              }
            }            
                connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: chosenItem.stock_quantity + parseInt(answer.add)
                    },
                    {
                        id: chosenItem.id
                    }
                ],
                function(error) {
                    if (error) throw err;
                    console.log("Inventory added successfully!");
                    connection.end();
                }
            );
          });
      });
  }

  function addNewProduct() {
      inquirer.prompt([
        {
            name: "product_name",
            type: "input",
            message: "What is the name of the product?"
          },
          {
            name: "category",
            type: "input",
            message: "What department does it fit?"
          },
          {
            name: "price",
            type: "input",
            message: "How much does it cost?",
            validate: function(value) {
              if (isNaN(value) === false) {
                return true;
              }
              return false;
            }
          },
          {
            name: "quantity",
            type: "input",
            message: "Number of quantities?",
            validate: function(value) {
              if (isNaN(value) === false) {
                return true;
              }
              return false;
            }
          }
      ])
      .then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "INSERT INTO products SET ?",
          {
            product_name: answer.product_name,
            department_name: answer.category,
            price: answer.price || 0,
            stock_quantity: answer.quantity || 0
          },
          function(err) {
            if (err) throw err;
            console.log("New Product added successfully!");
            connection.end();
          }
        );
      });
  }