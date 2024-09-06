'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class UserTable extends Model {
    static associate(models) {
      // define associations here
    }
  }

  UserTable.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'UserTable',
  });

  return UserTable;
};
