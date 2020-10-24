const inquirer = require("inquirer");
const mysql = require("mysql");
var promisemysql = require("promise-mysql");
const cTable = require('console.table');

const connectProp = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Tigerseye05!6",
    database: "employees_DB"
};
const connection = mysql.createConnection(connectProp);

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
                    addRole();
                    break;
                
                case "Add New Employee" : 
                    addEmployee();
                    break;
                
                case "View all Departments" : 
                    viewDepartments();
                    break;
                
                case "View all Roles" : 
                    viewRoles();
                    break;

                case "View all Employees" : 
                    viewEmployees();
                    break;

                case "Update Employee Role" : 
                    updateRole();
                    break;
                
                default:
                    console.log("See you later...");
                    process.exit();
            };
        });
};

function addDepartment(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Add Department:'
        }
    ]).then(answers => {
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: answers.department,
            },
            function(err){
                if (err) throw err;
                console.log('New Department added.')
                start();
            }
        );
    });
};

function addRole(){
    let departmentName = [];
    promisemysql.createConnection(connectProp)
    .then((dbconnection)=>{
        return Promise.all([
            dbconnection.query("SELECT * FROM department")
        ]);
    })
    .then(([department])=>{
        for(let i = 0; i<department.length; i++) {
            departmentName.push(department[i].name);
        }
        return Promise.all([department]);
    })
    .then(([department])=>{
        inquirer.prompt([
            {
                type:'input',
                name:'role',
                message:'Add Role:',
                validate: function(input){
                    if(input===""){
                        console.log("Please enter a Role.");
                        return false;
                    }else{
                        return true;
                    }
                }
            },
            {
                type:'input',
                name:'salary',
                message:'Add Role Salary:',
                validate: function(value){
                    if(isNaN(value)===false){
                        return true;
                    }else{
                        console.log("Please enter a Salary.");
                        return false;
                    }
                }
            },
            {
                type:'list',
                name:'department',
                message:'What is the Department for this Role:',
                choices: departmentName
            }
        ])
        .then(answers=>{
            let departmentID;

                // Assign a department ID based on the user input choice
            for (var i = 0; i < department.length; i++) {
                if (answers.department == department[i].name) {
                    departmentID = department[i].id;
                }
            } 
                
            connection.query(
                "INSERT INTO role SET ?",
                {
                title: answers.role,
                salary: answers.salary,
                department_id: departmentID
                },
                function(err) {
                if (err) throw err;
                console.log("Employee Role added successfully");
                start();
                }
            );
        })
    })
    
}


