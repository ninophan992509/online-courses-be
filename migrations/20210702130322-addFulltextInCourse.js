'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`ALTER TABLE courses
      ADD FULLTEXT course_index(course_name, description, short_description)WITH PARSER NGRAM`);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`ALTER TABLE courses
    DROP INDEX course_index`);
  }
};
