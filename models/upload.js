const {DataTypes} =require('sequelize');
const db = require('../db')

const Upload = db.define('upload', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    published: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bookUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    },
})

module.exports = Upload;