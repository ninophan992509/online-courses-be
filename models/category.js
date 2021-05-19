"use strict";
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define(
    "category",
    {
      cat_name: DataTypes.STRING,
      status: DataTypes.INTEGER,
    },
    {}
  );
  category.associate = function (models) {
    // associations can be defined here
    chapter.belongsTo(models.user);
  };
  return category;
};
