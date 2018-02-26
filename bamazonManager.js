var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "Uykusuz34!",
  database: "bamazonDB"
});

function shop() {
    inquirer.prompt([

        {
            type: "list",
            name: "doingWhat",
            message: "What would you like to do?",
            choices: ["View products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
          
        }
   
      ]).then(function(answer) {
          if (answer.doingWhat === "View products for Sale"){
            seeProducts();
            connection.end()
;          } 
          if (answer.doingWhat === "View Low Inventory"){
              seeLowInventory();
              connection.end();
          }
          if (answer.doingWhat === "Add to Inventory"){
              addInventory();
              // connection.end();
          }
          if (answer.doingWhat === "Add New Product"){
              addProduct();
              // connection.end();
          }
         });
      
  }
  
  
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

  function productArray() {
    var array =[];
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;  
      for (var i = 0; i < res.length; i++) {
        array.push(res[i].product_name);
      } 
      return(array);     
    });
  }

  function seeLowInventory() {
      console.log("Selecting Low Inventories...\n");
      connection.query("SELECT * FROM products", function(err, res){
          if (err) throw err;
          var array = [];
          for (var i = 0; i < res.length; i++){
           
            if (res[i].stock_quantity < 5){
              array.push(res[i].item_id);
              console.log(res[i].product_name + "|" + res[i].stock_quantity);
            }  
          }

          // print no low inventory !!
      });
  }
 

function addInventory() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    inquirer
      .prompt([{
        name: "inventory",
        type: "rawlist",
        choices: function(){
          var array = [];
          for (var i = 0; i < res.length; i++){
            array.push(res[i].product_name);
          }
          return array;
        },
        message: "What product would you like to add to?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many would you like to add?"
      }])
      .then(function(answer) {
        var chosenProduct = answer.inventory;

        for (var i = 0; i < res.length; i++) {
          if (chosenProduct === res[i].product_name) {
            var quantity = res[i].stock_quantity;
            var newQuantity = quantity + parseInt(answer.quantity);

            connection.query("UPDATE products SET stock_quantity = ? WHERE product_name = ?",[newQuantity,chosenProduct],
              function(err, res) {
                if(err) throw err;
                
                  console.log("Current Inventory: " + newQuantity);

                  console.log("You have successfully added inventory");
              }
            );
            connection.end();
          }
        }
      });
    });
}


  function addProduct(){
    inquirer.prompt([
      {
        type: "input",
        name: "productName",
        message: "product_name: ?"
      },
      {
        type: "input",
        name: "departmentName",
        message: "department_name: ?"
      },
      {
        type: "input",
        name: "price",
        message: "price: ?"
      },
      {
        type: "input",
        name: "stockQuantity",
        message: "stock_quantity: ?"
      }
    ])
  .then(function(answer){
    console.log(answer.productName + " | " + answer.departmentName + " | " + answer.price + " | " + answer.stockQuantity);

    var insertRecord = 'INSERT INTO products(product_name,department_name,price,stock_quantity) VALUE(?,?,?,?)';
    connection.query(insertRecord,[answer.productName,answer.departmentName,answer.price,answer.stockQuantity], function(err,res){
      if(err) throw err;
      else {
          console.log('A new inventory has been added.');

      }
    });
    connection.end();
  }) 
  
}


  shop();