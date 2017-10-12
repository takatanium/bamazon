let inquirer = require('inquirer');
let mysql = require('mysql');
let Table = require('cli-table');

let connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  database: 'bamazon'
});

let queryManager = function () {
  let managerChoices = [
    `View Products for Sale`,
    `View Low Inventory`,
    `Add to Inventory`,
    `Add New Product`
  ];
  inquirer.prompt([
    {
      type: 'list',
      choices: managerChoices,
      name: 'choice',
      message: `What do you want to do?`
    }
  ]).then(function (ans) {
    connection.connect(function (err) {
      if (err) throw err;
      switch (ans.choice) {
        case `View Low Inventory`: displayInventory(5); break;
        case `Add to Inventory`: addInventory(); break;
        case `Add New Product`: newInventory(); break;
        default: displayInventory('none'); break;
      }
    });
  });
};

let displayInventory = function (limit) {
  let limitString = '';
  if (limit !== 'none') limitString = ` WHERE stock_quantity<=${limit}`;
  connection.query(`SELECT * FROM products${limitString}`, function (err, res) {
    if (err) throw err;
    let table = new Table({
      head: ['ID', 'PRODUCT', 'DEPARTMENT', 'PRICE', 'QUANTITY'],
      colWidths: [5, 25, 25, 10, 10]
    });
    for (let i = 0; i < res.length; i++) {
      table.push([res[i].item_id, res[i].product_name, 
                  res[i].department_name, 
                  res[i].price.toFixed(2), 
                  res[i].stock_quantity]);
    }
    console.log(table.toString());
    connection.end();
  });
};

let addInventory = function () {
  inquirer.prompt([
    {
      name: 'id',
      message: `Add inventory to which item id?`,
      validate: (val) => !isNaN(parseInt(val))
    }, {
      name: 'quantity',
      message: `How many units to add?`,
      validate: (val) => !isNaN(parseInt(val))
    }
  ]).then(function (ans) {
    if (ans.id.trim().length === 0 || 
        ans.quantity.trim().length === 0) {
      console.log(`Fields cannot be empty`);
      displayInventory('none');
    } else {
      connection.query(
        `UPDATE products
        SET stock_quantity=stock_quantity+${ans.quantity}
        WHERE item_id=${ans.id}`,
        function (err, res) {
          if (err) throw err;
          displayInventory('none');
        }
      );
    }
  });
};

let newInventory = function () {
  inquirer.prompt([
    {
      name: 'name',
      message: `What is product name?`,
      validate: (val) => val.trim().length !== 0
    }, {
      name: 'dept',
      message: `What department?`,
      validate: (val) => val.trim().length !== 0
    }, {
      name: 'price',
      message: `How much does it cost?`,
      validate: (val) => !isNaN(parseFloat(val))
    }, {
      name: 'quantity',
      message: `How much units to add?`,
      validate: (val) => !isNaN(parseInt(val))
    }
  ]).then(function (ans) {
    connection.query(`SELECT department_name FROM products`, 
      function (err, res) {
        if (err) throw err;
        if (res.findIndex(i => i.department_name === ans.dept.trim()) >= 0) {
          connection.query(`INSERT INTO products SET ?`,
            {
              product_name: ans.name,
              department_name: ans.dept,
              price: parseFloat(ans.price),
              stock_quantity: parseInt(ans.quantity)
            },
            function (err, res) {
              if (err) throw err;
              displayInventory('none');
            }
          );
        } else {
          console.log(`Department ${ans.dept} does not exist.`);
          displayInventory('none');
        }
      }
    );
  });
};

queryManager();
