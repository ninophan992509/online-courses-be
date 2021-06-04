"use strict";
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define(
    "category",
    {
      category_name: DataTypes.STRING,
      status: DataTypes.INTEGER,
      number_enrolled: DataTypes.INTEGER,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER
    },
    {}
  );
  category.associate = function (models) {
    // associations can be defined here
    category.belongsTo(models.user);
  };
  return category;
};
