"use strict";
module.exports = (sequelize, DataTypes) => {
  const watch_list = sequelize.define(
    "watch_list",
    {
      courseId: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {}
  );
  watch_list.associate = function (models) {
    // associations can be defined here
    watch_list.belongsTo(models.user);
    watch_list.belongsTo(models.course);
  };
  return watch_list;
};
