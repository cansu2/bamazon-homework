var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "Uykusuz34!",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  seeProducts();
});

function seeProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;  
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
      }
      console.log("-----------------------------------"); 
    });
  }


  function shop() {
    inquirer.prompt([

        {
          type: "input",
          name: "whatProduct",
          message: "What would you like to get?"
        },
        {
            type: "input",
            name: "howMany",
            message: "How many of them would you like buy?"
        }
      
      ]).then(function(answer) {
        checkStock(answer.whatProduct, answer.howMany);
      });    
  }

  function checkStock(arg1,arg2){
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;  
      for (var i = 0; i < res.length; i++) {
        if (arg1 === res[i].product_name) {
          var stock = res[i].stock_quantity;
          if (stock < arg2){
            console.log("Insufficient quantity!!")
            shop();
          } else {
            checkOut(arg1,arg2);
          }
        }
      }
      // connection.end();
    });
  }

  function checkOut(arg1, arg2){
    var stock = 0;
    var new_stock = 0;
    var price = 0;
    var total = 0;
    var current_revenue = 0; 
    var revenue = 0;
  
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;  
      for (var i = 0; i < res.length; i++) {
        if (arg1 === res[i].product_name) {

          price = res[i].price;
          total = price * arg2;
          revenue = res[i].product_sales;
          
          stock = res[i].stock_quantity;
          new_stock = stock - arg2;
          current_revenue = revenue + total;

          console.log("Total: $" + total);
          // console.log(current_revenue);
          updateProduct(new_stock, arg1);
          updateRevenue(current_revenue, arg1);
        }
      } 
    });
  }; 

  function updateRevenue(arg1,arg2){
    var updateRecord = 'UPDATE products SET product_sales = ? WHERE product_name = ?';
    connection.query(updateRecord,[arg1,arg2], function(err, res){
      if(err) throw err;
      else {
         console.log("Product Sales updated");
      }
    });
    connection.end();
  }

  function updateProduct(new_stock, arg1) {
    var updateRecord = 'UPDATE products SET stock_quantity = ? WHERE product_name = ?';
    connection.query(updateRecord,[new_stock,arg1], function(err, res){
      if (err) throw err;
      else {
          console.log('Stocks are updated');
          console.log(new_stock);
      }
    });
    // connection.end();
  };

  function updateSales(arg1,arg2){   
    var updateRecord = 'UPDATE products SET stock_quantity = ? WHERE product_name = ?';
    connection.query(updateRecord,[new_stock,arg1], function(err, res){
      if(err) throw err;
      else {
          console.log('Stocks are updated');
          // console.log(new_stock);
      }
    });
  }


setTimeout(shop,1000);