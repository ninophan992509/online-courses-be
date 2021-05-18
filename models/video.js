'use strict';
module.exports = (sequelize, DataTypes) => {
  const video = sequelize.define('video', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    link: DataTypes.STRING,
    time: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER
  }, {});
  video.associate = function(models) {
    // associations can be defined here
  };
  return video;
};