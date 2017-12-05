var mysql = require('mysql');
var inquirer = require('inquirer');
var databaseKey = require('../database_key.js');


var connection = mysql.createConnection(databaseKey);

var Customer = function(){
    this.start = function(callback){
        connection.connect(function(err){
            console.log("Connected as id: " + connection.threadId);
            this.start();
        });

        var that = this;
        connection.query("SELECT * FROM products", function(err, res){
            res.forEach(function(item){
                console.log("Item Number: " + item.item_id + " " + item.product_name + " price: $" + item.price);                                        
            });
            inquirer.prompt(
                {
                    name: 'postOrBid',
                    type: 'rawlist',
                    message: 'Would you like to [POST] an auction or a [BID] on an auction?',
                    choices:['POST', 'BID']
                }
            ).then(function(answer){
                if(answer.postOrBid.toUpperCase()=="POST"){
                    
                    that.start(callback);
                } else {
                    callback(true);
                }
                return;
            });
        });
        
    }
}

module.exports = Customer;