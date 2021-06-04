"use strict";
module.exports = (sequelize, DataTypes) => {
  const document = sequelize.define(
    "document",
    {
      chapter_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      status: DataTypes.INTEGER,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
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
