"use strict";
module.exports = (sequelize, DataTypes) => {
  const watchlist = sequelize.define(
    "watchlist",
    {
      course_id: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
    },
    {}
  );
  watchlist.associate = function (models) {
    // associations can be defined here
    watchlist.belongsTo(models.user);
    watchlist.belongsTo(models.course);
  };
  return watchlist;
};
