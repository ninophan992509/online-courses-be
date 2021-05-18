'use strict';
module.exports = (sequelize, DataTypes) => {
  const watchlist = sequelize.define('watchlist', {
    status: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER
  }, {});
  watchlist.associate = function(models) {
    // associations can be defined here
  };
  return watchlist;
};