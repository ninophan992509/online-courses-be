"use strict";
module.exports = (sequelize, DataTypes) => {
  const enroll_list = sequelize.define(
    "enroll_list",
    {
      courseId: DataTypes.INTEGER,
      watching: DataTypes.INTEGER,
      done: DataTypes.STRING,
      status: DataTypes.INTEGER,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {}
  );
  enroll_list.associate = function (models) {
    // associations can be defined here
    enroll_list.belongsTo(models.user);
    enroll_list.belongsTo(models.course, { foreignKey: 'courseId' });
    enroll_list.belongsTo(models.chapter);
  };
  return enroll_list;
};
