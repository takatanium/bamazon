# bamazon

A CLI based Amazon-like storefront with the MySQL and Node.js. The app will take in orders from customers and deplete stock from the store's inventory, track product sales across store's departments and then provide a summary of the highest-grossing departments in the store.

## Getting Started

### Prerequisites

* Node.js
* MySQL 

### Installing

1. Create Database, see example schema in bamazon.sql
2. Install node dependencies

```
npm install
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

### Supervisor Interface

```
node bamazonSupervisor.js
```

## Built With

* [node.js](https://nodejs.org/en/) - Node Server
* [mysqyl](https://www.mysql.com/) - Database Management
* [inquirer-npm](https://www.npmjs.com/package/inquirer) - CLI Query
* [cli-table-npm](https://www.npmjs.com/package/cli-table) - CLI Table Display



