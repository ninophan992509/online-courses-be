"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn(
        "categories", // name of Source model
        "createdBy", // name of the key we're adding
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
            "updatedBy", // name of the key we're adding
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
              "createdBy", // name of the key we're adding
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
              "updatedBy", // name of the key we're adding
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
              "teacherId", // name of the key we're adding
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
              "categoryId", // name of the key we're adding
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
              "courseId", // name of the key we're adding
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
              "createdBy", // name of the key we're adding
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
              "updatedBy", // name of the key we're adding
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
              "courseId", // name of the key we're adding
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
              "createdBy", // name of the key we're adding
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
              "updatedBy", // name of the key we're adding
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
              "chapterId", // name of the key we're adding
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
              "createdBy", // name of the key we're adding
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
              "updatedBy", // name of the key we're adding
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
              "documents", // name of Source model
              "chapterId", // name of the key we're adding
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
              "documents", // name of Source model
              "createdBy", // name of the key we're adding
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
              "documents", // name of Source model
              "updatedBy", // name of the key we're adding
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
              "watch_lists", // name of Source model
              "courseId", // name of the key we're adding
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
              "watch_lists", // name of Source model
              "createdBy", // name of the key we're adding
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
              "watch_lists", // name of Source model
              "updatedBy", // name of the key we're adding
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
              "enroll_lists", // name of Source model
              "courseId", // name of the key we're adding
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
              "enroll_lists", // name of Source model
              "createdBy", // name of the key we're adding
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
              "enroll_lists", // name of Source model
              "updatedBy", // name of the key we're adding
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
        "createdBy" // key we want to remove
      )
      .then(() =>
        queryInterface.removeColumn(
          "categories", // name of Source model
          "updatedBy" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "courses", // name of Source model
          "createdBy" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "courses", // name of Source model
          "updatedBy" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "courses", // name of Source model
          "categoryId" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "courses", // name of Source model
          "teacherId" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "feedbacks", // name of Source model
          "courseId" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "feedbacks", // name of Source model
          "createdBy" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "feedbacks", // name of Source model
          "updatedBy" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "chapters", // name of Source model
          "courseId" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "chapters", // name of Source model
          "createdBy" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "chapters", // name of Source model
          "updatedBy" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "videos", // name of Source model
          "chapterId" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "videos", // name of Source model
          "createdBy" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "videos", // name of Source model
          "updatedBy" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "documents", // name of Source model
          "chapterId" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "documents", // name of Source model
          "createdBy" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "documents", // name of Source model
          "updatedBy" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "watch_lists", // name of Source model
          "courseId" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "watch_lists", // name of Source model
          "createdBy" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "watch_lists", // name of Source model
          "updatedBy" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "enroll_lists", // name of Source model
          "courseId" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "enroll_lists", // name of Source model
          "createdBy" // key we want to remove
        )
      )
      .then(() =>
        queryInterface.removeColumn(
          "enroll_lists", // name of Source model
          "updatedBy" // key we want to remove
        )
      );
  },
};
