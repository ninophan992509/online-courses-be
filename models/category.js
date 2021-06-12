"use strict";
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define(
    "category",
    {
      category_name: DataTypes.STRING,
      status: DataTypes.INTEGER,
      number_enrolled: DataTypes.INTEGER,
      parentId: DataTypes.INTEGER,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER
    },
    {}
  );
  category.associate = function (models) {
    // associations can be defined here
    category.belongsTo(models.user);
  };
  return category;
};
