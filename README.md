# bamazon
The tenth homework assignment.

## Components of the project

* A program for customers to buy things
 * Lists the products
 * Allows customer to select product to buy from its id
 * Allows them to also select quantity

* A program for managers
 * To view products and each products info
 * To view low inventory
 * To add to any products inventory
 * To add a new product to existing departments

## Requirements
The requirements are all available from npm through "npm install".
It requires **mysql, inquirer, and cli-table2.**
There is a function called "runAgain" which is utilized on all 3 programs.
Instead of defining the function in each of the programs, I decided to define it in a separate file and module.export it to each file that uses it.

## Pictures
![customer buying product](/images/customer_buying.png)
![manager adding product](/images/manager_adding.png)
![manager options menu](/images/manager_menu.png)
![manager viewing products](/images/manager_viewing.png)
![supervisor adding department](/images/supervisor_adding.png)
![supervisor viewing departments](/images/supervisor_viewing.png)