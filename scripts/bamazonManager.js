var mysql = require('mysql');
var inquirer = require('inquirer');
var Table =  require('cli-table');

var Manager = function(sql){
    this.sql = sql;
    this.start = function(callback){
        var that = this;
        var menuChoices = [
            "i) View Current Inventory",
            "l) View Low Inventory",
            "a) Add to Inventory",
            "n) Add New Product",
            "e) Return to Main Menu"
        ];
        inquirer.prompt({
            name: 'menuChoice',
            type: 'list',
            message: 'Welcome Manager what would you like to do?',
            choices:menuChoices
        }).then(function(answer){
            switch(answer.menuChoice.split(")")[0]){
                case 'i':
                    that.sql.query("SELECT * FROM products", function(err, res){
                        if(err) throw err;
                        var dbTable = new Table({
                            head: ['Item ID', 'Product', 'Department', 'Price', 'Stock Qty'],
                            colWidths: [10, 50, 30, 12, 20]
                        });
                        res.forEach(function(product){
                            dbTable.push([product.item_id, product.product_name, product.department_name, product.price, product.stock_quantity]);
                        });

                        console.log(dbTable.toString() + "\n");
                        that.start(callback);
                    });
                    break;
                case 'l':
                    console.log("Viewing Low Inventory...");
                    that.sql.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res){
                        if(err) throw err;
                        var dbTable = new Table({
                            head: ['Item ID', 'Product', 'Department', 'Price', 'Stock Qty'],
                            colWidths: [10, 50, 30, 12, 20]
                        });
                        res.forEach(function(product){
                            dbTable.push([product.item_id, product.product_name, product.department_name, product.price, product.stock_quantity]);
                        });

                        console.log(dbTable.toString() + "\n");
                        that.start(callback);
                    });
                    break;
                case 'a':
                        inquirer.prompt([
                            {
                                name:"itemId",
                                type:"input",
                                message: "Which product would you like to order more stock for? (Please enter ID#)",
                                validate: function(value){
                                    var itemId = value.match(/^[0-9]+$/);
                                    if(itemId){
                                        return true;
                                    }
                                    return 'Please enter a valid ID#';
                                }
                            },
                            {
                                name:"stockQty",
                                type:"input",
                                message:"How much should we order?",
                                validate: function(value){
                                    var stock = value.match(/^[0-9]+$/);
                                    if(stock){
                                        return true;
                                    }
                                    return 'Please enter an amount.';
                                }
                                
                            }
                        ]).then(function(answer){
                            that.sql.query("SELECT * FROM products WHERE ?", { item_id: parseInt(answer.itemId) }, 
                            function(err, res){
                                that.sql.query("UPDATE products SET ? WHERE ?",[{
                                    stock_quantity: (res[0].stock_quantity + parseInt(answer.stockQty))
                                },{
                                    item_id: parseInt(answer.itemId)
                                }], function(err, res){
                                    if(err) throw err;
                                    console.log(res.affectedRows + " item(s) have been updated.\n");
                                    that.start(callback);
                                });
                            });
                        });

                    break;
                case 'n':
                    console.log("====== Add A New Product ======");
                    inquirer.prompt([
                        {
                            name:"productName",
                            type:"input",
                            message: "What is the name of the product?",
                            validate: function(str){
                                if(str !== ""){
                                    return true;
                                }
                                return 'Please enter a product name.';
                            }
                        },
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
                            name:"price",
                            type:"input",
                            message:"What is the price of the product?",
                            validate: function(value){
                                var price = value.match(/^[0-9]+(\.[0-9]{1,2})?$/);
                                if(price){
                                    return true;
                                }
                                return 'Please enter an amount. ex: 199.99';
                            }
                            
                        },
                        {
                            name:"stockQty",
                            type:"input",
                            message:"How much should we order?",
                            validate: function(value){
                                var stock = value.match(/^[0-9]+$/);
                                if(stock){
                                    return true;
                                }
                                return 'Please enter an amount.';
                            }
                            
                        }
                    ]).then(function(answer){
                        that.sql.query("INSERT INTO products SET ?",{
                            product_name: answer.productName,
                            department_name:answer.departmentName,
                            price: parseFloat(answer.price),
                            stock_quantity: parseInt(answer.stockQty)                
                        }, function(err, res){
                            if(err) throw err;
                            console.log(answer.productName + " has been added.\n");
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

module.exports = Manager;