"use strict";
module.exports = (sequelize, DataTypes) => {
  const assignlist = sequelize.define(
    "assignlist",
    {
      watching: DataTypes.INTEGER,
      done: DataTypes.STRING,
      status: DataTypes.INTEGER,
    },
    {}
  );
  assignlist.associate = function (models) {
    // associations can be defined here
    assignlist.belongsTo(models.user);
    assignlist.belongsTo(models.course);
    assignlist.belongsTo(models.chapter);
  };
  return assignlist;
};
