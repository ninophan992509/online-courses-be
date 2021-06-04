"use strict";
module.exports = (sequelize, DataTypes) => {
  const chapter = sequelize.define(
    "chapter",
    {
      course_id: DataTypes.STRING,
      chapter_name: DataTypes.STRING,
      description: DataTypes.TEXT,
      is_previewed: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
    },
    {}
  );
  chapter.associate = function (models) {
    // associations can be defined here
    chapter.belongsTo(models.user);
    chapter.belongsTo(models.course);
  };
  return chapter;
};
