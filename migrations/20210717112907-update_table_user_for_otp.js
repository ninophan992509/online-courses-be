'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('users', 'confirm', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
      queryInterface.addColumn('users', 'otp', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('courses', 'confirm'),
      queryInterface.removeColumn('courses', 'otp'),
    ]);
  }
};
