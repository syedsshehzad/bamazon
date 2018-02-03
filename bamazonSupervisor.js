//	BAMAZONSUPERVISOR.JS

var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");
var colors = require("colors/safe");
var runAgain = require("./runAgain.js");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "sequelserver",
	database: "bamazon"
});

connection.connect(err => {
	if (err) throw err;
	console.log("connected as id " + connection.threadId + "\n");
	afterConnection();
});


function afterConnection() {

	inquirer.prompt([
		{
			type: "list",
			name: "choice",
			message: "What do you want to do, supervisor?",
			choices: ["View product sales by department", "Create new department"]
		}
	]).then(answer => {

		switch (answer.choice) {

			case "View product sales by department":

				connection.query("SELECT * FROM departments",
				(err,res) => {

					if (err) throw err;

					var headings = [
						colors.yellow("department_id"),
						colors.yellow("department_name"),
						colors.yellow("over_head_costs"),
						colors.yellow("product_sales"),
						colors.yellow("total_profit")
					];
					
					var table = new Table({
						head: headings
					});
					

					for (var row = 0; row < res.length; row++) {
						table.push([]);
						table[row].push(
							res[row].department_id, 
							res[row].department_name, 
							res[row].over_head_costs, 
							res[row].product_sales, 
							res[row].product_sales - res[row].over_head_costs
						);
					}
				
					console.log(table.toString());
					runAgain(afterConnection,connection);
				});
				break;

			case "Create new department":

				inquirer.prompt([
					{
						type: "input",
						name: "name",
						message: "Enter name of new department."
					}, {
						type: "input",
						name: "costs",
						message: "Enter overhead cost of new department."
					}
				]).then(answers => {
					connection.query("INSERT INTO departments SET ?",
					{
						department_name: answers.name,
						over_head_costs: answers.costs,
						product_sales: 0
					},
					(err,res) => {
						if (err) throw err;
						console.log(res);
						console.log("\nNEW DEPARTMENT " + answers.name);
						runAgain(afterConnection,connection);
					});
				});
				break;
		}

	});
}
