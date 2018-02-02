//	BAMAZONMANAGER.JS

var mysql = require("mysql");
var inquirer = require("inquirer");

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
	inquirer.prompt([{
		type: "list",
		name: "choice",
		message: "What do you want to do, manager?",
		choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product"]
	}]).then(answer => {

		switch (answer.choice) {

			case "View products for sale":

				connection.query("SELECT * FROM products",
				(err,res) => {
					if (err) throw err;
					//res.forEach(entry => {	console.log(entry);	});
					//res[i].itemid -> 
					console.log(res[2][1]);
					runAgain();
				});
				break;

			case "View low inventory":

				connection.query("SELECT * FROM products WHERE stock_quantity < 5",
				(err,res) => {
					if (err) throw err;
					res.forEach(entry => {	console.log(entry);	});
					runAgain();
				});
				break;
				
			case "Add to inventory":

				inquirer.prompt([
					{
						type: "input",
						name: "id",
						message: "What is the ID of the product you would like to add more of?"
					}, {
						type: "input",
						name: "quantity",
						message: "How many units of the product would you like to add?"
					}
				]).then(answers => {

					connection.query("SELECT * FROM products WHERE item_id=" + answers.id,
					(err,res) => {
						if (err) throw err;
						var oldQuantity = res[0].stock_quantity;
						var newQuantity = oldQuantity + parseInt(answers.quantity);

						connection.query("UPDATE products SET stock_quantity=" + newQuantity + " WHERE item_id=" + answers.id,
						(err,res) => {
							if (err) throw err;
							console.log(res.message);
							console.log("NEW QUANTITY " + newQuantity);
							runAgain();
						});
					});
				});
				break;

			case "Add new product":

				inquirer.prompt([
					{
						type: "input",
						name: "product_name",
						message: "What is the name of new product?"
					}, {
						type: "input",
						name: "department_name",
						message: "What department?"
					}, {
						type: "input",
						name: "price",
						message: "What is the price?"
					}, {
						type: "input",
						name: "stock_quantity",
						message: "What is the stock quantity?"
					}
				]).then(ans => {
					connection.query("INSERT INTO products SET ?",
					{
						product_name: ans.product_name,
						department_name: ans.department_name,
						price: ans.price,
						stock_quantity: ans.stock_quantity
					},
					(err,res) => {
						if (err) throw err;
						console.log(res.message);
						console.log("NEW PRODUCT " + ans.product_name);
						runAgain();
					});
				});
				break;	
		}

	});
}


function runAgain() {
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