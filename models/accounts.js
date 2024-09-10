'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class accounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      accounts.belongsTo(models.usertable, {
        foreignKey:'user_id',
        onDelete:'CASCADE'
      });
    }
  }
  accounts.init({
    account_type: DataTypes.STRING,
    account_number: DataTypes.STRING,
    balance: DataTypes.DECIMAL,
    currency: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'accounts',
  });
  return accounts;
};