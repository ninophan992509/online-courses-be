"use strict";
module.exports = (sequelize, DataTypes) => {
  const course = sequelize.define(
    "course",
    {
      course_name: DataTypes.STRING,
      number_assigned: DataTypes.INTEGER,
      rating: DataTypes.FLOAT,
      number_rating: DataTypes.INTEGER,
      picture: DataTypes.TEXT,
      tuition_fee: DataTypes.BIGINT,
      sale: DataTypes.FLOAT,
      description: DataTypes.TEXT,
      status: DataTypes.INTEGER,
    },
    {}
  );
  course.associate = function (models) {
    // associations can be defined here
    course.belongsTo(models.user);
    course.belongsTo(models.category);
  };
  return course;
};
