"use strict";
module.exports = (sequelize, DataTypes) => {
  const watch_list = sequelize.define(
    "watch_list",
    {
      course_id: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
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
