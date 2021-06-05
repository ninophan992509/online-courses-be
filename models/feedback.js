"use strict";
module.exports = (sequelize, DataTypes) => {
  const feedback = sequelize.define(
    "feedback",
    {
      courseId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      rating: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {}
  );
  feedback.associate = function (models) {
    // associations can be defined here
    feedback.belongsTo(models.user);
    feedback.belongsTo(models.course);
  };
  return feedback;
};
