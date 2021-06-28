"use strict";
module.exports = (sequelize, DataTypes) => {
  const document = sequelize.define(
    "document",
    {
      lessonId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      status: DataTypes.INTEGER,
      link: DataTypes.STRING,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {}
  );
  document.associate = function (models) {
    // associations can be defined here
    document.belongsTo(models.user);
    document.belongsTo(models.lesson);
  };
  return document;
};
