'use strict';
module.exports = (sequelize, DataTypes) => {
  const document = sequelize.define('document', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER
  }, {});
  document.associate = function(models) {
    // associations can be defined here
  };
  return document;
};