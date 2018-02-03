//	RUNAGAIN.JS

var inquirer = require("inquirer");

var runAgain = function (afterConnection, connection) {
	console.log("\n");
	inquirer.prompt([{
		type: "confirm",
		name: "restart",
		message: "Do you want to make another selection?"
	}]).then(ans => {
		if (ans.restart) {
			afterConnection();
		} else {
			connection.end();
		}
	});
}

module.exports = runAgain;