# bamazon
This project has two main javascript files that shows how the backend of what Amazon would be like using MySQL database. The first file, bamazonCustomer.js shows the stock of every products and its specifics. The second file, bamazonManager.js has some uniques features like how to add new products and how to add more stocks on low inventories. 

## Getting Started
Here are some guidelines to how to get this project working in your own terminal. You will be able to see a glimpse of what the real world stocking inventory looks like. 

### Prerequisites
1. Node.js must be installed on machine. See https://nodejs.org/en/download/ for instructions.
2. Mysql must be installed on machine. See https://dev.mysql.com/downloads/installer/ for instructions.
    i. A mysql connection must be created. See mysql documentation.

### Overview
1. bamazonCustomer.js file is for customers to purchase products. 
2. bamazonManager.js file has these following features for a manager.
    - View Products for Sale
    - View Low Inventory
    - Add to Inventory
    - Add New Product
3. The file package.json contains the package dependancies that must be installed.
4. The file .gitignore contains the file types that are not pushed github. 

### Installing
1. To be able to install on your own machine, git clone it from this link: https://github.com/danhunlee/bamazon
2. In a bash terminal or Visual Code terminal navigate to the directory that you downloaded the files from github.
3. Install the Node packages (cli-table, inquirer, mysql) by entering the following in the terminal:
npm install
4. Create the mysql database:
    1. Open command prompt or Git Bash terminal and change to directory (cd) where file is located.
    2. Open a connection to mysql by entering in the terminal "mysql -uroot -p"
    3. Enter "password" when prompted.
    4. Enter "source bamazon.sql"
    5. You should see several "Query OK" messages, indicating that the database was successfully created.

### Operation
The bamazon apps can be operated by entering commands in the terminal as instructed below. All apps provide prompts that are self explanitory.

1. Run app as a customer to purchase items:
*node bamazonCustomer.js*
2. Run app as a manager to view product sales and control inventory:
*node bamazonManager.js*

### Testing
This link is a demo version of this app. 
<!-- * [bamazon Test demo](bamazonDemo.mov) -->
![bamazonCustomer](/Img & Test demo/Screen Shot 2019-07-08 at 8.08.55 PM.png)
![bamazonManager1](/Img & Test demo/Screen Shot 2019-07-08 at 8.10.19 PM.png)
![bamazonManager2](/Img & Test demo/Screen Shot 2019-07-08 at 8.10.59 PM.png)



## Deployment

Navigate to https://github.com/danhunlee/bamazon to clone.

## Built With

* [Visual Studio Code](https://code.visualstudio.com/)

## Authors
* Heon Lee

## License
* This project is not licensed. 