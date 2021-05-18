'use strict';
module.exports = (sequelize, DataTypes) => {
  const feedback = sequelize.define('feedback', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    rating: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER
  }, {});
  feedback.associate = function(models) {
    // associations can be defined here
  };
  return feedback;
};