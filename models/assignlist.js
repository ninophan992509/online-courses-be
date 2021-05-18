'use strict';
module.exports = (sequelize, DataTypes) => {
  const assignlist = sequelize.define('assignlist', {
    watching: DataTypes.INTEGER,
    done: DataTypes.STRING,
    status: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER
  }, {});
  assignlist.associate = function(models) {
    // associations can be defined here
  };
  return assignlist;
};