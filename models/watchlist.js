"use strict";
module.exports = (sequelize, DataTypes) => {
  const watchlist = sequelize.define(
    "watchlist",
    {
      status: DataTypes.INTEGER,
    },
    {}
  );
  watchlist.associate = function (models) {
    // associations can be defined here
    // watchlist.belongsTo(models.user);
    // watchlist.belongsTo(models.course);
  };
  return watchlist;
};
