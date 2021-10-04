
const sequelize = require('sequelize');
const User = require('./user');
const Upload = require('./upload');
const Notes = require('./notes');

User.hasMany(Upload);
Upload.belongsTo(User);

User.hasMany(Notes);
Notes.belongsTo(User);

Upload.hasMany(Notes);
Notes.belongsTo(Upload); 

module.exports = {User, Upload, Notes}