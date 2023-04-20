const { Sequelize } = require('sequelize');

const sequelize =  require('../db/connect');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Employee = require('./Employee')(sequelize, Sequelize);
db.Technology = require('./Technology')(sequelize, Sequelize);
db.Project = require('./Project')(sequelize, Sequelize);
db.EmployeeTechnology = require('./EmployeeTechnology')(sequelize, Sequelize);
db.ProjectEmployee = require('./ProjectEmployee')(sequelize, Sequelize);
db.User = require('./User')(sequelize, Sequelize);

db.Image = require('./Image')(sequelize, Sequelize);

const associations = require('../associations');

associations(db);

module.exports = db;
