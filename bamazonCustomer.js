//	BAMAZONCUSTOMER.JS

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

	connection.query("SELECT * FROM products", (err, res) => {

		if (err) throw err;
		
		res.forEach(entry => {
			console.log(entry.item_id + ". " + entry.product_name + "; price: $" + entry.price);
		});


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
			if (answers.quantity <= res[answers.id - 1].stock_quantity) {
				purchase(res, answers);
			} else {
				console.log("Insufficient quantity!");
			}

			connection.end();

		});
		
	});


}

function purchase(res, answers) {
	console.log(res[answers.id - 1].stock_quantity + " " + answers.quantity);

	var newQuantity = res[answers.id - 1].stock_quantity - answers.quantity;

	var total = res[answers.id - 1].price * answers.quantity;

	connection.query("UPDATE products SET stock_quantity=" + newQuantity + " WHERE item_id=" + answers.id,
	(err,res) => {
		if (err) throw err;
		// if (res.changedRows) {
		// 	console.log("SUCCESS!");
		// } else {
		// 	console.log("UNSUCCESSFUL")
		// }
		console.log(res.message);
		console.log("total cost: " + total + "\nnew quantity: " + newQuantity);

	});
}