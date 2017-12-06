var inquirer = require('inquirer');
var Customer = require('./scripts/bamazonCustomer.js');
var Manager = require('./scripts/bamazonManager.js');

var runP = true;
var runPChoices = [
    'Customer: Order a product',
    new inquirer.Separator(),
    'Manager: Management Panel',
    'Supervisor: Supervisor Panel',
    "Exit: Leave Bamazon."
  ];

var managerPass = 'BamazonMan2017';

function loadCommand(command){
    switch(command){
        case "Customer":
            var newCustomer = new Customer();
            newCustomer.start(runProgram);
            break;
        case "Manager":
            console.log("Manager loading...");
            checkPassword(managerPass);
            break;
        case "Supervisor":
            console.log("Supervisor loading...");
            runProgram(runP);
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

function checkPassword(password){
    inquirer.prompt({
        name: 'manPass',
        type: 'input',
        message: 'Please enter the Manager Password: (You can type exit to go back to the main menu)' 
     }).then(function(answer){
         if(answer.manPass === 'exit'){
             runProgram(true);
         } else if(answer.manPass === password){
             console.log("Awesome You are the Man(ager)!");
             var newManager = new Manager();
             newManager.start(runProgram);
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
        process.exit();
    } 
    
}

runProgram(runP);