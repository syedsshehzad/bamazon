//	BAMAZONCUSTOMER.JS

var mysql = require("mysql");
var inquirer = require("inquirer");
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

	connection.query("SELECT * FROM products", (err, res) => {
		if (err) throw err;
		
		//	Print each of the items for sale.
		res.forEach(entry => {
			console.log(entry.item_id + ". " + entry.product_name + "; price: $" + entry.price);
		});

		console.log("\n");

		inquirer.prompt([
			{
				type: "input",
				name: "id",
				message: "What is the ID of the product you would like to buy?"
			}, {
				type: "input",
				name: "quantity",
				message: "How many units of the product would you like to buy?"
			}
		]).then(answers => {

			var item = res[answers.id - 1];

			//	If the amount requested is LESS THAN the stock quantity of the requested item, then purchase.
			if (answers.quantity <= item.stock_quantity) {
				purchase(item, answers);
			} else {
				console.log("Insufficient quantity!\n");
				runAgain(afterConnection,connection);
			}

		});

	});
}


function purchase(item, answers) {
	console.log("IN STOCK " + item.stock_quantity + ", REQUESTED " + answers.quantity);

	var newQuantity = item.stock_quantity - answers.quantity;

	var totalCost = item.price * answers.quantity;

	var newSales = item.product_sales + totalCost;

	//	Updating the "products" table's "stock_quantity" and "product_sales" columns:
	connection.query("UPDATE products SET ? WHERE item_id=" + answers.id,
		{
			stock_quantity: newQuantity,
			product_sales: newSales
		},
	(error,result) => {
		if (error) throw error;
		console.log(result.message);
		console.log(
			"total cost: " + totalCost + 
			"\nnew quantity: " + newQuantity + 
			"\nproduct total sales: " + newSales
		);
	});

	//	Updating the "departments" table's "product_sales" column:
	connection.query("SELECT product_sales FROM departments WHERE department_name=?", item.department_name,
	(error,result) => {
		if (error) throw error;
		var newDeptSales = result[0].product_sales + totalCost;
		connection.query("UPDATE departments SET product_sales=" + newDeptSales + " WHERE department_name=?", item.department_name,
		(err,res) => {
			if (err) throw err;
			console.log(res.message);
			runAgain(afterConnection,connection);
		});
	});
}
