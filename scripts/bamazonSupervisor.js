var mysql = require('mysql');
var inquirer = require('inquirer');
var databaseKey = require('../database_key.js');

var connection = mysql.createConnection(databaseKey);