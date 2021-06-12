const db = require('../models');
const Categories = require('../models/category')(db.sequelize, db.Sequelize.DataTypes);
const STATUS = require('../enums/status.enum');
const { QueryTypes } = require('sequelize');

Categories.hasMany(Categories, { foreignKey: 'parentId' });
Categories.belongsTo(Categories, { foreignKey: 'parentId' });

exports.findAll = async function (page, limit) {
    return await Categories.findAndCountAll({
        where: { status: STATUS.active, parentId: null },
        limit,
        offset: (page - 1) * limit,
        include: [
            {
                model: Categories,
                where: {
                    status: STATUS.active
                },
                required: false
            }
        ],
        distinct: true,
    });
}

exports.create = async function (entity) {
    return await Categories.create(entity);
}


exports.findOne = async function (whereObject) {
    return await Categories.findOne({
        where: whereObject,
        include: [
            {
                model: Categories,
                where: {
                    status: STATUS.active
                },
                required: false
            }
        ]
    });
}

exports.update = async function (dbEntity, updateEntity) {
    return await dbEntity.update(updateEntity);
}

exports.updateEnrolled = async function (categoryId) {
    const dbEntity = await exports.findOne({ id: categoryId });
    const newNumberEnrolled = dbEntity.number_enrolled + 1;
    const parent = await exports.findOnd({ id: dbEntity.parentId })
    const newPE = parent.number_enrolled + 1;
    await parent.update({ number_enrolled: newPE });
    return await dbEntity.update({ number_enrolled: newNumberEnrolled });
}

exports.findMostEnrollInWeek = async function () {
    const result = await db.sequelize.query(
        ` SELECT c2.*, COUNT(*) as numberEnrollThisWeek` +
        ` FROM enroll_lists el` +
        ` JOIN courses c ON el.courseId = c.id` +
        ` JOIN categories c2 ON c.categoryId = c2.id` +
        ` WHERE YEARWEEK(el.createdAt, 1) = YEARWEEK(CURDATE(), 1)` +
        ` GROUP BY c.categoryId` +
        ` ORDER BY numberEnrollThisWeek DESC` +
        ` LIMIT 10`,
        QueryTypes.SELECT);
    return result[0];
}
