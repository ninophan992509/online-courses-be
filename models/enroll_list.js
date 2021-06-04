"use strict";
module.exports = (sequelize, DataTypes) => {
  const enroll_list = sequelize.define(
    "enroll_list",
    {
      course_id: DataTypes.INTEGER,
      watching: DataTypes.INTEGER,
      done: DataTypes.STRING,
      status: DataTypes.INTEGER,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
    },
    {}
  );
  enroll_list.associate = function (models) {
    // associations can be defined here
    enroll_list.belongsTo(models.user);
    enroll_list.belongsTo(models.course);
    enroll_list.belongsTo(models.chapter);
  };
  return enroll_list;
};
