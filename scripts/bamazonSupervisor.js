var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

var Supervisor = function(sql){
    this.sql = sql;
    this.start = function(callback){
        var that = this;
        
        var menuChoices = [
            "v) View Product Sales by Department",
            "n) Add New Department",
            "e) Return to Main Menu"
        ];

        inquirer.prompt({
            name: 'menuChoice',
            type: 'list',
            message: 'Welcome Supervisor what would you like to do?',
            choices:menuChoices
        }).then(function(answer){
            switch(answer.menuChoice.split(")")[0]){
                case 'v':
                    var deptQuery = "SELECT departments.department_id, products.department_name,  departments.over_head_cost, SUM( products.product_sales) AS product_sales, SUM( products.product_sales) - (departments.over_head_cost) AS total_profit FROM products INNER JOIN departments ON products.department_name = departments.department_name GROUP BY  departments.department_name order by departments.department_id"
                    that.sql.query(deptQuery, function(err, res){
                        if(err) throw err;
                        var dbTable = new Table({
                            head: ['Department ID', 'Department Name', 'Over Head Cost', 'Product Sales', 'Total Profit'],
                            colWidths: [10, 40, 20, 20, 20]
                        });
                        res.forEach(function(department){
                            dbTable.push([department.department_id, department.department_name, department.over_head_cost, department.product_sales, department.total_profit]);
                        });

                        console.log(dbTable.toString() + "\n");
                        that.start(callback);
                    });
                    break;
                case 'n':
                    console.log("====== Add A New Department ======");
                    inquirer.prompt([
                        {
                            name:"departmentName",
                            type:"input",
                            message: "What is the name of the department?",
                            validate: function(str){
                                if(str !== ""){
                                    return true;
                                }
                                return 'Please enter a department name.';
                            }
                        },
                        {
                            name:"overHead",
                            type:"input",
                            message:"What is the department overhead cost?",
                            validate: function(value){
                                var price = value.match(/^[0-9]+(\.[0-9]{1,2})?$/);
                                if(price){
                                    return true;
                                }
                                return 'Please enter an amount: ex - 19999.99';
                            }
                            
                        },
                    ]).then(function(answer){
                        that.sql.query("INSERT INTO departments SET ?",{
                            department_name:answer.departmentName,
                            over_head_cost: parseFloat(answer.overHead),               
                        }, function(err, res){
                            if(err) throw err;
                            console.log(answer.departmentName + " has been added.\n");
                            that.start(callback);
                        });
                    });
                    break;
                case 'e':
                    callback(true);
                    break;
            }
            
        });
    }
}

module.exports = Supervisor;