//*************************************** MAIN-FUNCTION-JSCRIPT *****************************************//

    const Manager = require("./lib/Manager");
    const Engineer = require("./lib/Engineer");
    const Intern = require("./lib/Intern");
    const inquirer = require("inquirer");
    const path = require("path");
    const fs = require("fs");

    const OUTPUT_DIR = path.resolve(__dirname, "renderedRoladex");
    const outputPath = path.join(OUTPUT_DIR, "roladex.html");

    const render = require("./lib/htmlgen");

//EMPLOYEE ARRAY//
    var employeeArray = [];

//VALIDATE INPUT NOT EMPTY//
    var validateInput = function validateName(input) {
    if (input !== '') {
        return true;
    } else return `Error! Invalid input, please retry.`;
    };

//VALIDATE INPUT IS A NUMBER//
    var validateNumber = function validateNumber(number) {
    var num = /^\d+$/;
    if (num.test(number)) {
        return true;
    } else return `Error! Invalid input, please enter a number!`;
    };

//VALIDATE EMAIL FORMAT//
    var validateEmail = function validateEmail(email) {
    const mail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (mail.test(String(email).toLowerCase())) {
        return true;
    } else return `Please enter a valid email address.`;
    };

//LAUNCH INQUIRE - MANAGER FIRST//
    function getEmployeeRoladex() {
    console.log("Welcome to the 'Git Employee Summary'! Input your response followed by pressing 'ENTER' to continue or press 'CTRL+C' at any time to exit.");
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the Manager's name.",
                name: "managerName",
                validate: validateInput
            },
            {
                type: "input",
                message: "Enter the Manager's ID.",
                name: "managerId",
                validate: validateNumber
            },
            {
                type: "input",
                message: "Enter the Manager's email address.",
                name: "managerEmail",
                validate: validateEmail
            },
            {
                type: "input",
                message: "Enter the Manager's office number.",
                name: "managerOfficeNumber",
                validate: validateNumber
            }
        ])
        .then(function (response) {
            const manager = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerOfficeNumber);
            employeeArray.push(manager);
            promptNextEmployee();
        });

    }

//PROMPT FOR NEXT EMPLOYEE OR RENDER ROLADEX//
    function promptNextEmployee() {
    inquirer
        .prompt(
            {
                type: "list",
                message: "Continue with another employee?",
                name: "employeeRole",
                choices: ["Engineer",
                    new inquirer.Separator(),
                    "Intern",
                    new inquirer.Separator(),
                    "No"
                ]
            }
        )
        .then(function (response) {
            switch (response.employeeRole) {
                case ("Engineer"):
                    addEngineer();
                    break;
                case ("Intern"):
                    addIntern();
                    break;
                default:
                    renderEmployees(employeeArray);
            }
        });
}

//ENGINEER DETAILS//
    function addEngineer() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the Engineer's name.",
                name: "engineerName",
                validate: validateInput
            },
            {
                type: "input",
                message: "Enter the Engineer's ID.",
                name: "engineerId",
                validate: validateNumber
            },
            {
                type: "input",
                message: "Enter the Engineer's email address.",
                name: "engineerEmail",
                validate: validateEmail
            },
            {
                type: "input",
                message: "Enter the Engineer's Github ID.",
                name: "engineerGithub",
                validate: validateInput
            }
        ])
        .then(function (response) {
            const engineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerGithub);
            employeeArray.push(engineer);
            promptNextEmployee();
        });

    }

//INTERN DETAILS
    function addIntern() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the Intern's name.",
                name: "internName",
                validate: validateInput
            },
            {
                type: "input",
                message: "Enter the Intern's ID.",
                name: "internId",
                validate: validateNumber
            },
            {
                type: "input",
                message: "Enter the Intern's email address.",
                name: "internEmail",
                validate: validateEmail
            },
            {
                type: "input",
                message: "Enter the Intern's school's name.",
                name: "internSchool",
                validate: validateInput
            }
        ])
        .then(function (response) {
            const intern = new Intern(response.internName, response.internId, response.internEmail, response.internSchool);
            employeeArray.push(intern);
            promptNextEmployee();
        });

    }

//CREATE ROLADEX & EXIT APP//
    function renderEmployees(employeeArray) {
    var renderedRoladex = render(employeeArray);
    if (!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFile(outputPath, renderedRoladex,
        function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Employee Roladex HTML file successfully created! Please check roladex.html in the output folder.");
        }
    );
    }

    getEmployeeRoladex();