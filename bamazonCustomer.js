var mysql = require('mysql');
var inquirer = require('inquirer');
// set up mysql connection
var connection = mysql.createConnection({
    host: 'localhost',
    port:3306,
    user:'root',
    password:'dlgjs123!',
    database:'bamazon_DB'
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    display();
    buyProduct();

  });

  //grab the table from mysql
  function display() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.table(res)
    })
  }

  // function which prompts the user for buying the products
  function buyProduct() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
      inquirer.prompt([
        {
          name: "whatId",
          type: "number",
          message: "What is the ID of the product that you would like to purchase?",
      },
      {
          name: "howMany",
          type: "input",
          message: "How many of them would you like buy?",
          validate: function(value) {
              if (isNaN(value) === false) {
                  return true;
              }
              return false;
          }
      }
      ])
      .then(function(answer) {
        var chosenID;
        for(var i = 0; i < res.length; i++) {
            if(res[i].id === answer.whatId) {
                chosenID = res[i];
            }
        }
    
      // Determine if quantity input was too high
      if (chosenID.stock_quantity > parseInt(answer.howMany)) {
          connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                  {
                      stock_quantity: chosenID.stock_quantity - answer.howMany
                  },
                  {
                      id: chosenID.id
                  }
              ],
              function(error) {
                  if (error) throw err;
                  var total = chosenID.price * answer.howMany;
                  console.log("Quantity orderd successfully!");
                  console.log("Your total is $" + total);
                  connection.end();
              }
          );
      }
      else{
          console.log("Insufficient quantity!");
            connection.end();
      }
    });
});
}