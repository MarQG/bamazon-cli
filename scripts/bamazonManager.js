var mysql = require('mysql');
var inquirer = require('inquirer');
var databaseKey = require('../database_key.js');
var Table =  require('cli-table');

var connection = mysql.createConnection(databaseKey);

var Manager = function(){
    this.start = function(callback){
        var that = this;
        connection.connect(function(err){
            this.start(callback);
        });
        
        connection.query('SELECT * FROM products', function(err, res){
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
                        console.log("Viewing Inventory...");
                        that.start(callback);
                        break;
                    case 'l':
                        console.log("Viewing Low Inventory...");
                        that.start(callback);
                        break;
                    case 'a':
                        console.log("Adding More Inventory...");
                        that.start(callback);
                        break;
                    case 'n':
                        console.log("Adding New Inventory...");
                        that.start(callback);
                        break;
                    case 'e':
                        callback(true);
                        break;
                }
                
            });
        });
        
    }
}

module.exports = Manager;