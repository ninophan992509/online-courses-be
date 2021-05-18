'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      course_name: {
        type: Sequelize.STRING
      },
      number_assigned: {
        type: Sequelize.INTEGER
      },
      rating: {
        type: Sequelize.FLOAT
      },
      number_rating: {
        type: Sequelize.INTEGER
      },
      picture: {
        type: Sequelize.TEXT
      },
      tuition_fee: {
        type: Sequelize.BIGINT
      },
      sale: {
        type: Sequelize.FLOAT
      },
      description: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.INTEGER
      },
      created_by: {
        type: Sequelize.INTEGER
      },
      updated_by: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('courses');
  }
};