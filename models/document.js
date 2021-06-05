"use strict";
module.exports = (sequelize, DataTypes) => {
  const document = sequelize.define(
    "document",
    {
      chapterId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      status: DataTypes.INTEGER,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {}
  );
  document.associate = function (models) {
    // associations can be defined here
    document.belongsTo(models.user);
    document.belongsTo(models.chapter);
  };
  return document;
};
