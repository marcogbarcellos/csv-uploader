'use strict';

module.exports = function(sequelize, DataTypes) {
  var Expense = sequelize.define("expense", {
    date: {
      type: DataTypes.DATE // Change to date
    },
    expensedescription: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING
    },
    pretaxamount: {
      type: DataTypes.DOUBLE // Change to number
    },
    taxamount: {
      type: DataTypes.DOUBLE // Change to number
    },
    taxname: {
      type: DataTypes.STRING
    }

  }, {
    freezeTableName: true // Model tableName will be the same as the model name
  }, {
    classMethods: {
      associate: function(models) {
        Expense.belongsTo(models.Employee);
      }
    }
  });
  Expense.sync({force: true}).then(function () {
    // Table created
  });
  return Expense;  
};