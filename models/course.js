"use strict";
module.exports = (sequelize, DataTypes) => {
  const course = sequelize.define(
    "course",
    {
      course_name: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      picture: DataTypes.TEXT,
      description: DataTypes.TEXT,
      number_enrolled: DataTypes.INTEGER,
      rating: DataTypes.FLOAT,
      number_rating: DataTypes.INTEGER,
      tuition_fee: DataTypes.BIGINT,
      sale: DataTypes.FLOAT,
      status: DataTypes.INTEGER,
      teacherId: DataTypes.INTEGER,
      createdby: DataTypes.INTEGER,
      updatedby: DataTypes.INTEGER,
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
