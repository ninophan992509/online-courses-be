"use strict";
module.exports = (sequelize, DataTypes) => {
  const course = sequelize.define(
    "course",
    {
      course_name: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      picture: DataTypes.TEXT,
      description: DataTypes.TEXT,
      number_assigned: DataTypes.INTEGER,
      rating: DataTypes.FLOAT,
      number_rating: DataTypes.INTEGER,
      tuition_fee: DataTypes.BIGINT,
      sale: DataTypes.FLOAT,
      status: DataTypes.INTEGER,
      teacher_id: DataTypes.INTEGER,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
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
