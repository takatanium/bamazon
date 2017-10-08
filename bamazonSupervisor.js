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
    'View Products for Sales by Department',
    'Create New Department'
  ];
  inquirer.prompt([
    {
      type: 'list',
      choices: supervisorChoices,
      name: 'choice',
      message: 'What do you want to do?'
    }
  ]).then(function (ans) {
    connection.connect(function (err) {
      if (err) throw err;
      switch (ans.choice) {
        case 'Create New Department': createDept(); break;
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
        console.log(res2);
        let table = new Table({
          head: ['ID', 'DEPARTMENT', 'OVERHEAD', 'SALES', 'TOTAL PROFIT'],
          colWidths: [5, 25, 15, 15, 15]
        });
        for (let i = 0; i < res1.length; i++) {
          table.push([
            res1[i].department_id,
            res2[i].dept,
            res1[i].over_head_costs,
            res2[i].sum === null ? 0.00 : res2[i].sum,
            res2[i].sum === null ? 0.00 : res2[i].sum -
              res1[i].over_head_costs
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
      message: 'Create what department?'
    }, {
      name: 'overhead',
      message: 'What is the overhead cost?'
    }
  ]).then(function (ans) {
    connection.query(
      'INSERT INTO departments SET ?',
      {
        department_name: ans.name,
        over_head_costs: parseFloat(ans.overhead)
      },
      function (err, res) {
        if (err) throw err;
        displayDepts();
      }
    );
  });
};

querySupervisor();
