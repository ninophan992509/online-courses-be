"use strict";
module.exports = (sequelize, DataTypes) => {
  const video = sequelize.define(
    "video",
    {
      lessonId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      link: DataTypes.STRING,
      time: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {}
  );
  video.associate = function (models) {
    // associations can be defined here
    video.belongsTo(models.user);
    video.belongsTo(models.lesson);
  };
  return video;
};
