'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usertable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      usertable.hasMany(models.accounts, {
        foreignKey:'user_id',
        onDelete:'CASCADE'
      });
    }
  }
  usertable.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    country: DataTypes.STRING,
    province: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'usertable',
  });
  return usertable;
};