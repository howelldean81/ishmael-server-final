const {DataTypes} =require('sequelize');
const db = require('../db')

const Notes = db.define('notes', {
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        entry: {
            type: DataTypes.STRING,
            allowNull: false
        },
});

module.exports = Notes;
   