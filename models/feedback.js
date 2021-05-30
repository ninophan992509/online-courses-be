"use strict";
module.exports = (sequelize, DataTypes) => {
  const feedback = sequelize.define(
    "feedback",
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      rating: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
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
