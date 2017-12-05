var inquirer = require('inquirer');
var Customer = require('./scripts/bamazonCustomer.js');

var runP = true;
var runPChoices = [
    'Customer: Order a product',
    new inquirer.Separator(),
    'Manager: Management Panel',
    'Supervisor: Supervisor Panel',
    "Exit: Leave Bamazon."
  ];



function loadCommand(command){
    switch(command){
        case "Customer":
            var newCustomer = new Customer();
            newCustomer.start(runProgram);
            break;
        case "Manager":
            console.log("Manager loading...");
            runProgram(runP);
            break;
        case "Supervisor":
            console.log("Supervisor loading...");
            runProgram(runP);
            break;
        case "Exit":
            console.log("Exit loading...");
            runProgram(false);
            break;
        default:
            runProgram(false);
            break;
    }
}

function runProgram(run){
    if(run){
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
        process.exit();
    } 
    
}

runProgram(runP);