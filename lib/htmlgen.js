//********************************GENERATE HTML(FRONT-END) ************************************//
    const path = require("path");
    const fs = require("fs");

    const templatesSrc = path.resolve(__dirname, "../src");

    const render = employees => {
    const html = [];

//ROLADEX SECTIONS(FRONT-END)//
    html.push(employees
    .filter(employee => employee.getRole() === "Manager")
    .map(manager => renderManager(manager))
    );

    html.push(employees
    .filter(employee => employee.getRole() === "Engineer")
    .map(engineer => renderEngineer(engineer))
    );

    html.push(employees
    .filter(employee => employee.getRole() === "Intern")
    .map(intern => renderIntern(intern))
    );

    return renderRoladex(html.join(""));

    };

//ROLADEX SECTIONS(BACK-END)//
    const renderManager = manager => {
    let template = fs.readFileSync(path.resolve(templatesSrc, "manager.html"), "UTF-8");
    template = replacePlaceholders(template, "name", manager.getName());
    template = replacePlaceholders(template, "role", manager.getRole());
    template = replacePlaceholders(template, "email", manager.getEmail());
    template = replacePlaceholders(template, "id", manager.getId());
    template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber());
    return template;
    };

    const renderEngineer = engineer => {
    let template = fs.readFileSync(path.resolve(templatesSrc, "engineer.html"), "UTF-8");
    template = replacePlaceholders(template, "name", engineer.getName());
    template = replacePlaceholders(template, "role", engineer.getRole());
    template = replacePlaceholders(template, "email", engineer.getEmail());
    template = replacePlaceholders(template, "id", engineer.getId());
    template = replacePlaceholders(template, "github", engineer.getGithub());
    return template;
    };

    const renderIntern = intern => {
    let template = fs.readFileSync(path.resolve(templatesSrc, "intern.html"), "UTF-8");
    template = replacePlaceholders(template, "name", intern.getName());
    template = replacePlaceholders(template, "role", intern.getRole());
    template = replacePlaceholders(template, "email", intern.getEmail());
    template = replacePlaceholders(template, "id", intern.getId());
    template = replacePlaceholders(template, "school", intern.getSchool());
    return template;
    };

    const renderRoladex = html => {
    const template = fs.readFileSync(path.resolve(templatesSrc, "main.html"), "UTF-8");
    return replacePlaceholders(template, "roladex", html);
    };

    const replacePlaceholders = (template, placeholder, value) => {
    const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
    return template.replace(pattern, value);
    };

    module.exports = render;