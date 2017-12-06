var mysql = require('mysql');
var inquirer = require('inquirer');
var databaseKey = require('../database_key.js');

var connection = mysql.createConnection(databaseKey);

var Customer = function(){
    this.start = function(callback){
        connection.connect(function(err){
            this.start(callback);
        });

        var that = this;
        var items = [];
        connection.query("SELECT * FROM products", function(err, res){
            if(err){
                return console.log("Error Occured: " + err);
            }
            res.forEach(function(item){
                items.push( item.item_id + ") " + item.product_name + " price: $" + item.price);                                        
            });
            items.push("e) Return to Main Menu.");
            inquirer.prompt(
                {
                    name: 'purchase',
                    type: 'list',
                    message: 'Which item would you like to purchase?',
                    choices:items
                }
            ).then(function(answer){
                var choice = answer.purchase.split(')')[0];
                if(choice === 'e'){
                    callback(true);
                } else{
                    inquirer.prompt({
                        name: 'purchaseNum',
                        type: 'input',
                        message: 'How many would you like to buy?',
                        validate: function(value){
                            var quantity = value.match(/^[0-9]+$/);
                            if(quantity){
                                return true;
                            }
                            return 'Please enter a number.';
                        }
                    }).then(function(answer){
                        that.purchase(choice, answer.purchaseNum, res[choice-1], callback);
                    });
                }
                return;
            });
        });    
    }

    this.purchase = function(choice, amount, dbItem, callback){
        var quantity = parseInt(amount);
        var reduceStock = dbItem.stock_quantity - quantity;
        var increaseSales = dbItem.product_sales + quantity;
        var purchasePrice = quantity * parseFloat(dbItem.price);
        if(reduceStock >= 0){ 
            var updateSql = mysql.format("UPDATE products SET stock_quantity = ?, product_sales = ? WHERE item_id = ?", [reduceStock, increaseSales, parseInt(choice)]);
            connection.query(updateSql, function(err, res){
                if(err){
                    console.log(err);
                }
                console.log("Your order has been successfully placed. Total Cost: $" + purchasePrice);
            });
            this.start(callback);
        } else {
                console.log("Insufficient stock quantity! Please check back later");
            this.start(callback);
        }
    }
}

module.exports = Customer;