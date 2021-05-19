"use strict";
module.exports = (sequelize, DataTypes) => {
  const video = sequelize.define(
    "video",
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      link: DataTypes.STRING,
      time: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
    },
    {}
  );
  video.associate = function (models) {
    // associations can be defined here
    // video.belongsTo(models.user);
    // video.belongsTo(models.chapter);
  };
  return video;
};
