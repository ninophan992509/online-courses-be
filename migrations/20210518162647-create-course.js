"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("courses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      course_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      number_enrolled: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      rating: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      number_rating: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      total_rating: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      picture: {
        type: Sequelize.TEXT,
      },
      tuition_fee: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      sale: {
        type: Sequelize.FLOAT,
      },
      short_description: {
        type: Sequelize.TEXT,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("courses");
  },
};
