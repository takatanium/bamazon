let inquirer = require('inquirer');
let mysql = require('mysql');
let Table = require('cli-table');

let connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'testuser',
  password: '',
  database: 'bamazon'
});

let queryCust = function () {
  connection.connect(function (err) {
    if (err) throw err;
    connection.query(`SELECT * FROM products`, function (err, res) {
      if (err) throw err;
      let table = new Table({
        head: ['ID', 'PRODUCT', 'PRICE'],
        colWidths: [5, 25, 10]
      });
      for (let i = 0; i < res.length; i++) {
        table.push([res[i].item_id, res[i].product_name, res[i].price]);
      }
      console.log(table.toString());
      inquirer.prompt([
        {
          name: 'id',
          message: 'ID of item to purchase?'
        }, {
          name: 'quant',
          message: 'Quantity to purchase?'
        }
      ]).then(function (ans) {
        purchaseItem(ans.id, ans.quant);
      });
    });
  });
};

let purchaseItem = function (id, quant) {
  connection.query(
    `SELECT stock_quantity, price FROM products
    WHERE item_id=${id}`,
    function (err, res) {
      if (err) throw err;
      if (parseInt(quant) > res[0].stock_quantity) {
        console.log('Insufficient quantities!');
        connection.end();
      } else {
        let inventory = res[0].stock_quantity - parseInt(quant);
        let totalCost = res[0].price * parseInt(quant);
        connection.query(
          `UPDATE products 
          SET stock_quantity=${inventory}, product_sales=product_sales+${totalCost}
          WHERE item_id=${id}`,
          function (err, res) {
            if (err) throw err;
            console.log(`TOTAL COST: $${totalCost.toFixed(2)}`);
            connection.end();
          }
        );
      }
    }
  );
};

queryCust();
