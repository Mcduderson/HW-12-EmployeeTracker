const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employees_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "startOptions",
                message: "What actions do you want to take?",
                choices: [
                    "Add New Department",
                    "Add New Role",
                    "Add New Employee",
                    "View all Departments",
                    "View all Roles",
                    "View all Employees",
                    "Update Employee Role",
                    "Exit program"
                ] 
            }
        ])
        .then(answers => {

            switch(answers.startOptions){

                case "Add New Department" :
                    addDepartment();
                    break;

                case "Add New Role" :
                    addEmployeeRole();
                    break;
                
                case "Add New Employee" : 
                    addEmployee();
                    break;
                
                case "View all Departments" : 
                    viewDepartments();
                    break;
                
                case "View all Roles" : 
                    viewEmployeeRoles();
                    break;

                case "View all Employees" : 
                    viewEmployees();
                    break;

                case "Update Employee Role" : 
                    changeJob();
                    break;
                
                default:
                    console.log("See you later...");
                    process.exit();
            };
        });
};


