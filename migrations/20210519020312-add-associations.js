"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn(
        "categories", // name of Source model
        "created_by", // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: "users", // name of Target model
            key: "id", // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        }
      )
      .then(() =>
        queryInterface
          .addColumn(
            "categories", // name of Source model
            "updated_by", // name of the key we're adding
            {
              type: Sequelize.INTEGER,
              references: {
                model: "users", // name of Target model
                key: "id", // key in Target model that we're referencing
              },
              onUpdate: "CASCADE",
              onDelete: "SET NULL",
            }
          )
          .then(() =>
            queryInterface.addColumn(
              "courses", // name of Source model
              "created_by", // name of the key we're adding
              {
                type: Sequelize.INTEGER,
                references: {
                  model: "users", // name of Target model
                  key: "id", // key in Target model that we're referencing
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
              }
            )
          )
          .then(() =>
            queryInterface.addColumn(
              "courses", // name of Source model
              "updated_by", // name of the key we're adding
              {
                type: Sequelize.INTEGER,
                references: {
                  model: "users", // name of Target model
                  key: "id", // key in Target model that we're referencing
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
              }
            )
          )
          .then(() =>
            queryInterface.addColumn(
              "courses", // name of Source model
              "teacher_id", // name of the key we're adding
              {
                type: Sequelize.INTEGER,
                references: {
                  model: "users", // name of Target model
                  key: "id", // key in Target model that we're referencing
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
              }
            )
          )
          .then(() =>
            queryInterface.addColumn(
              "courses", // name of Source model
              "category_id", // name of the key we're adding
              {
                type: Sequelize.INTEGER,
                references: {
                  model: "categories", // name of Target model
                  key: "id", // key in Target model that we're referencing
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
              }
            )
          )
          .then(() =>
            queryInterface.addColumn(
              "feedbacks", // name of Source model
              "course_id", // name of the key we're adding
              {
                type: Sequelize.INTEGER,
                references: {
                  model: "courses", // name of Target model
                  key: "id", // key in Target model that we're referencing
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
              }
            )
          )
          .then(() =>
            queryInterface.addColumn(
              "feedbacks", // name of Source model
              "created_by", // name of the key we're adding
              {
                type: Sequelize.INTEGER,
                references: {
                  model: "users", // name of Target model
                  key: "id", // key in Target model that we're referencing
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
              }
            )
          )
          .then(() =>
            queryInterface.addColumn(
              "feedbacks", // name of Source model
              "updated_by", // name of the key we're adding
              {
                type: Sequelize.INTEGER,
                references: {
                  model: "users", // name of Target model
                  key: "id", // key in Target model that we're referencing
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
              }
            )
          )
          .then(() =>
            queryInterface.addColumn(
              "chapters", // name of Source model
              "course_id", // name of the key we're adding
              {
                type: Sequelize.INTEGER,
                references: {
                  model: "courses", // name of Target model
                  key: "id", // key in Target model that we're referencing
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
              }
            )
          )
          .then(() =>
            queryInterface.addColumn(
              "chapters", // name of Source model
              "created_by", // name of the key we're adding
              {
                type: Sequelize.INTEGER,
                references: {
                  model: "users", // name of Target model
                  key: "id", // key in Target model that we're referencing
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
              }
            )
          )
          .then(() =>
            queryInterface.addColumn(
              "chapters", // name of Source model
              "updated_by", // name of the key we're adding
              {
                type: Sequelize.INTEGER,
                references: {
                  model: "users", // name of Target model
                  key: "id", // key in Target model that we're referencing
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
              }
            )
          )
          .then(() =>
            queryInterface.addColumn(
              "videos", // name of Source model
              "chap_id", // name of the key we're adding
              {
                type: Sequelize.INTEGER,
                references: {
                  model: "chapters", // name of Target model
                  key: "id", // key in Target model that we're referencing
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
              }
            )
          )
          .then(() =>
            queryInterface.addColumn(
              "videos", // name of Source model
              "created_by", // name of the key we're adding
              {
                type: Sequelize.INTEGER,
                references: {
                  model: "users", // name of Target model
                  key: "id", // key in Target model that we're referencing
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
              }
            )
          )
          .then(() =>
            queryInterface.addColumn(
              "videos", // name of Source model
              "updated_by", // name of the key we're adding
              {
                type: Sequelize.INTEGER,
                references: {
                  model: "users", // name of Target model
                  key: "id", // key in Target model that we're referencing
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
              }
            )
          )
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn(
        "categories", // name of Source model
        "created_by" // key we want to remove
      )
      .then(() =>
        queryInterface.removeColumn(
          "categories", // name of Source model
          "updated_by" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "courses", // name of Source model
          "created_by" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "courses", // name of Source model
          "updated_by" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "courses", // name of Source model
          "category_id" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "courses", // name of Source model
          "teacher_id" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "feedbacks", // name of Source model
          "course_id" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "feedbacks", // name of Source model
          "created_by" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "feedbacks", // name of Source model
          "updated_by" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "chapters", // name of Source model
          "course_id" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "chapters", // name of Source model
          "created_by" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "chapters", // name of Source model
          "updated_by" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "videos", // name of Source model
          "chap_id" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "videos", // name of Source model
          "created_by" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "videos", // name of Source model
          "updated_by" // key we want to remove
        )
      );
  },
};
