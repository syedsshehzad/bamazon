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

The requirements are all available from npm through *"npm install"*.
It requires **mysql, inquirer,** and **cli-table2.**
**ColorsJS** does *not* need to be installed separately since it is included in **cli-table2**.
There is a pre-included function called *"runAgain"* which is utilized in all 3 programs.
Instead of creating the function repeatedly in each of the programs, I decided to define it in a separate file and *module.export* it to each program.

## How to run the program on your machine

In order to run this program, you will need MySQL Workbench, NodeJS, and the required NPM packages.
After you have downloaded and installed all them, you will need to create the database.
Open and log in to MySQL Workbench, then run the included file **createDB.sql**.
Don't forget to modify the JavaScript files to replace the MySQL connection password with your own password, port number, and username.
To run a program, enter in command prompt `node bamazonCustomer.js` for example.

## Pictures

![customer buying product](/images/customer_buying.png)
![manager adding product](/images/manager_adding.png)
![manager options menu](/images/manager_menu.png)
![manager viewing products](/images/manager_viewing.png)
![supervisor adding department](/images/supervisor_adding.png)
![supervisor viewing departments](/images/supervisor_viewing.png)