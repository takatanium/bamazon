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

let querySupervisor = function () {
  let supervisorChoices = [
    `View Sales by Department`,
    `Create New Department`
  ];
  inquirer.prompt([
    {
      type: 'list',
      choices: supervisorChoices,
      name: 'choice',
      message: `What do you want to do?`
    }
  ]).then(function (ans) {
    connection.connect(function (err) {
      if (err) throw err;
      switch (ans.choice) {
        case `Create New Department`: createDept(); break;
        default: displayDepts(); break;
      }
    });
  });
};

let displayDepts = function () {
  connection.query(`SELECT * FROM departments`, function (err, res1) {
    if (err) throw err;
    connection.query(
      `SELECT departments.department_name AS dept,
      SUM(products.product_sales) AS sum
      FROM departments
      LEFT JOIN products
      ON products.department_name=departments.department_name
      GROUP BY dept
      ORDER BY departments.department_id`,
      function (err, res2) {
        if (err) throw err;
        let table = new Table({
          head: ['ID', 'DEPARTMENT', 'OVERHEAD', 'SALES', 'TOTAL PROFIT'],
          colWidths: [5, 25, 15, 15, 15]
        });
        for (let i = 0; i < res1.length; i++) {
          let sum = res2[i].sum === null ? 0.00 : res2[i].sum;
          table.push([
            res1[i].department_id,
            res2[i].dept,
            res1[i].over_head_costs.toFixed(2),
            sum.toFixed(2),
            (sum - res1[i].over_head_costs).toFixed(2)
          ]);
        }
        console.log(table.toString());
        connection.end();
      }
    );
  });
};

let createDept = function () {
  inquirer.prompt([
    {
      name: 'name',
      message: `Create what department?`
    }, {
      name: 'overhead',
      message: `What is the overhead cost?`
    }
  ]).then(function (ans) {
    if (ans.name.trim().length === 0 || ans.overhead.trim().length === 0) {
      console.log(`Fields cannot be blank.`);
      displayDepts();
    } else {
      connection.query(
        `INSERT INTO departments SET ?`,
        {
          department_name: ans.name,
          over_head_costs: Math.abs(parseFloat(ans.overhead))
        },
        function (err, res) {
          if (err) throw err;
          displayDepts();
        }
      );
    }
  });
};

querySupervisor();
