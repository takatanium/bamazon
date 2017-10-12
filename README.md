# bamazon

A CLI based Amazon-like storefront with the MySQL and Node.js. The app will take in orders from customers and deplete stock from the store's inventory, track product sales across store's departments and then provide a summary of the highest-grossing departments in the store.

## Getting Started

### Prerequisites

* Node.js
* MySQL 

### Installing

1. Install node dependencies
```
npm install
```

2. Create Database, see example schema in bamazon.sql
	* Create bamazon database
	* Run bamazon.sql to create tables
	* Edit package.json as necessary for user
```
npm run mysql
```


## Running the App

### Customer Interface

```
node bamazonCustomer.js
```

1. Displays truncated inventory table
2. Queries customer what to buy via ID and how many units.
3. Displays how much money spent.

See [bamazonCustomer Demo](http://recordit.co/CK4pRysGB3) for a video demonstration. 

### Manager Interface

```
node bamazonManager.js
```

#### Queries manager of task

1. **View Products for Sale**
	* Displays inventory table
2. **View Low Inventory**
	* Displays items in inventory where quantity is less than 6
3. **Add to Inventory**
	* Allows manager to add quantity to inventory
4. **Add New Product**
	* Allows manager to add a new product to inventory

See [bamazonManager Demo](http://recordit.co/sr8AdODeqy) for a video demonstration. 

### Supervisor Interface

```
node bamazonSupervisor.js
```

#### Queries supervisor of task

1. **View Sales by Department**
	* Displays Department Sales with Total Profit by Department
2. **Create New Department**
	* Allows supervisor to create a new department

See [bamazonSupervisor Demo](http://recordit.co/6PmxLL0cCe) for a video demonstration. 

## Built With

* [node.js](https://nodejs.org/en/) - Node Server
* [mysqyl](https://www.mysql.com/) - Database Management
* [inquirer-npm](https://www.npmjs.com/package/inquirer) - CLI Query
* [cli-table-npm](https://www.npmjs.com/package/cli-table) - CLI Table Display



