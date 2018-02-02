//	BAMAZONSUPERVISOR.JS

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
		choices: ["View product sales by department", "Create new department"]
	}]).then(answer => {

		switch (answer.choice) {

			case "View product sales by department":

				var table = [];

				//head: ["department_id", "department_name", "over_head_costs", "product_sales", "total_profit"];

				// for (var i = 0; i < 10; i++) {
				// 	for (var j = 0; j < 5; j++) {
				// 		table[i][0] = res[i].department_id;
				// 		table[i][1] = res[i].department_name;
				// 		table[i][2] = res[i].over_head_costs;
				// 		table[i][3] = array[i].product_sales;
				// 		table[i][4] = array[i].total_profit;
				// 	}
				// }

				
					

// connection.query("SELECT department_name FROM products",
// (err,res) => {
// 	if (err) throw err;
// 	res.forEach(entry => {
// 		connection.query("INSERT INTO departments (department_name) VALUE ('" + entry.department_name + "')",(err,res) =>{if (err) throw err})
// 	console.log(entry.department_name)
// 	})
// }
// )
var total;

for (var i = 1; i < 6; i++) {


	connection.query("SELECT department_name FROM departments WHERE department_id=" + i,
	(err,res) => {
		if (err) throw err;
		var deptName = res[0].department_name;
		console.log(deptName);


		connection.query("SELECT product_sales FROM products WHERE department_name=?", deptName,
								(error, sales) => {
									//var sales = result[0].product_sales;
									console.log(sales)
									sales.forEach(entry => {
										if (entry.product_sales > 1) {total = total + parseFloat(entry.product_sales);}
									})
									console.log(total);
								});






	});


}
				// connection.query("SELECT * FROM departments",
				// (err,res) => {
				// 	var sales = 0;
				// 	if (err) throw err;
				// 	for (var i = 0; i < 10; i++) {

				// 		connection.query("SELECT * FROM products WHERE department_name='" + res[i].department_name + "'",
				// 		(error, result) => {
				// 			if (err) throw err;
				// 			//console.log(result[)
				// 			result.forEach(entry => {
				// 				sales += entry.product_sales;
				// 				console.log(sales + "gfd")
				// 			});
				// 		});

				// 		//array[i].product_sales = sales;
				// 		console.log(res[i].department_name);
						
				// 	}

					
				// });
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