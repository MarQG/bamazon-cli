var inquirer = require('inquirer');
var mysql = require('mysql');
var Customer = require('./scripts/bamazonCustomer.js');
var Manager = require('./scripts/bamazonManager.js');
var Supervisor = require('./scripts/bamazonSupervisor.js');
var databaseKey = require('./database_key.js');

var connection = mysql.createConnection(databaseKey);

var runP = true;
var runPChoices = [
    'Customer: Order a product',
    new inquirer.Separator(),
    'Manager: Management Panel',
    'Supervisor: Supervisor Panel',
    "Exit: Leave Bamazon."
  ];

var managerPass = 'BamazonMan2017';
var supervisorPass = "BamazonSuper2017";

function loadCommand(command){
    switch(command){
        case "Customer":
            var newCustomer = new Customer(connection);
            newCustomer.start(runProgram);
            break;
        case "Manager":
            checkPassword();
            break;
        case "Supervisor":
            checkPassword();
            break;
        case "Exit":
            runProgram(false);
            break;
        default:
            console.log("Something went wrong. Command: " + command);
            runProgram(false);
            break;
    }
}

function checkPassword(){
    inquirer.prompt({
        name: 'manPass',
        type: 'input',
        message: 'Please enter Your Password: (You can type exit to go back to the main menu)' 
     }).then(function(answer){
         if(answer.manPass === 'exit'){
             runProgram(true);
         } else if(answer.manPass === managerPass){
             var newManager = new Manager(connection);
             newManager.start(runProgram);
         } else if(answer.manPass === supervisorPass){
            var newSupervisor = new Supervisor(connection);
            newSupervisor.start(runProgram);
        } else {
             console.log("Sorry wrong password!");
             checkPassword();
         }
     });
}

function runProgram(run){
    if(run){
        console.log('\x1Bc');
        var message =   
                '============================== \n' +
                '  =      Welcome to Bamazon    = \n' +
                '  = What would you like to do? = \n' +
                '  ============================== \n';

        inquirer
        .prompt([
          {
            type: 'list',
            name: 'choice',
            message: message,
            choices: runPChoices
          }
        ])
        .then(answers => {
          loadCommand(answers.choice.split(":")[0]);
        });
    } else {
        console.log( "\nThanks for using Bamazon! Exiting Program...\n");
        connection.end();
        process.exit();
    } 
    
}

connection.connect(function(err){
    if(err) throw err;
    runProgram(runP);
});
