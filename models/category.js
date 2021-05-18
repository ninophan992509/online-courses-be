'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    cat_name: DataTypes.STRING,
    status: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER
  }, {});
  category.associate = function(models) {
    // associations can be defined here
  };
  return category;
};