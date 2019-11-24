var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon_db"
});

connection.connect();

connection.query("SELECT * FROM products", function(err, response) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  console.log("WELCOME TO BAMAZON!");

  var table = createTable();
  loadTable(table, response);

});

var createTable = () => {
  return new Table({
    head: ['Product id', 'product Description', 'Cost', 'Quantity'],
    colWidths: [12, 50, 8],
    colAligns: ['center', 'left', 'right'],
    style: {
        head: ['aqua'],
        compact: true
    }
  });
};

var loadTable = (table, response) => {
  for (var i = 0; i < response.length; i++){
      table.push([response[i].id, response[i].product_name, response[i].department_name, response[i].price, response[i].quantity]);
  }
  console.log(table.toString());
  console.log("");

  runSearch();
}

function runSearch() {
  inquirer
    .prompt({
      name: "productID",
      type: "number",
      message: "What itema(id) would you like to purchase?"
    })
    .then(function(answers) {
      var productId = answers.productID;
      
      inquirer
        .prompt({
          name: "purchasedProductQTY",
          type: "number",
          message: "How many would you like to purchase?"
        })
        .then(function(answers) {
          var quantity = answers.purchasedProductQTY;
          connection.query(`SELECT * FROM products WHERE id = ${productId} and quantity >= ${quantity}`, function (err, results) {
            if (err) throw err;

            if (results.length)
            {
              console.log(`Order fulfilled. $${quantity * results[0].price}`);
              connection.query(`update products set quantity = ${results[0].quantity - quantity} WHERE id = ${productId}`, function(err){
                if (err) throw err;
                console.log("Your order has been placed successfully!");
              })
            }
            else{
              console.log(`We are sorry! We do not have in stock.`);
            }
            connection.end();

          });
        });
    });

}