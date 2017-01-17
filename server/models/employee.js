'use strict';

module.exports = function(sequelize, DataTypes) {
  var Employee = sequelize.define("employee", {
    nameIdentifier: {
      type: DataTypes.STRING
    },
    employeename: {
      type: DataTypes.STRING
    },
    employeeaddress: {
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true // Model tableName will be the same as the model name
  }, {
    classMethods: {
      associate: function(models) {
        Employee.hasMany(models.Expense);
      }
    }
  });
  Employee.sync({force: true}).then(function () {
    // Table created
  });
  return Employee;
};