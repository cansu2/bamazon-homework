var mysql = require("mysql");
var inquirer = require("inquirer");
var sql = require('sql'); 

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
});



function start(){
    inquirer.prompt([

        {
         type: "list",
         message: "What would you like to do?",
         choices: ["View Product Sales by Department", "Create New Department"],
         name: "do"
        }
      
      ]).then(function(answer) {
        if (answer.do === "View Product Sales by Department"){
            updateSales();
        } 
        if (answer.do === "Create New Department"){
            createDepartment();
        }
      });
}

function updateSales(){
    var leftTable;
    connection.query("SELECT SUM(product_sales), department_name FROM products GROUP BY department_name", function(err, res) {

        if (err) throw err;  
        // console.log(res)
        for (var i = 0; i < res.length; i++) {
          leftTable = res[i]; 
          console.log(res[i].department_name);
         
        }
        console.log("-----------------------------------"); 
        console.log(leftTable); 
      });

    var departments = sql.define({
        name: 'departments',
        columns: ['department_id','department_name', 'over_head_costs' ]
    });

    var leftTable = sql.define({
        name: 'leftTable',
        columns: ['product_sales','department_name' ]
    });
     
    var newTable = departments.as('newTable');
    var table = departments.leftJoin(leftTable).on(departments.department_name.equals(leftTable.department_name));

   console.log(table.columns);
}



function createDepartment(){
    inquirer.prompt([
        {
          type: "input",
          name: "departmentName",
          message: "department_name: ?"
        },
        {
          type: "input",
          name: "ohc",
          message: "over_head_costs: ?"
        }
      ])
    .then(function(answer){
      console.log(answer.departmentName + " | " + answer.ohc);
  
      var insertRecord = 'INSERT INTO departments(department_name,over_head_costs) VALUE(?,?)';
      connection.query(insertRecord,[answer.departmentName,answer.ohc], function(err,res){
        if(err) throw err;
        else {
            console.log('A new department has been added.');
  
        }
      });
      connection.end();
    }) 
}


setTimeout(start,1000);