'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      lesson.hasOne(models.video,{foreignKey: 'lessonId'});
      lesson.hasMany(models.document,{foreignKey: 'lessonId'})
    }
  };
  lesson.init({
    chapterId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    number_order: DataTypes.INTEGER,
    content: DataTypes.STRING,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'lesson',
  });
  return lesson;
};