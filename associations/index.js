module.exports = (db) => {
    db.Employee.belongsToMany(db.Technology, { through: db.EmployeeTechnology });
    db.Technology.belongsToMany(db.Employee, { through: db.EmployeeTechnology });
  
    db.Project.belongsToMany(db.Employee, { through: db.ProjectEmployee });
    db.Employee.belongsToMany(db.Project, { through: db.ProjectEmployee });

    db.Technology.hasMany(db.EmployeeTechnology);
    db.EmployeeTechnology.belongsTo(db.Technology);
    db.EmployeeTechnology.belongsTo(db.Employee);

    db.Employee.hasMany(db.ProjectEmployee);
    db.ProjectEmployee.belongsTo(db.Project);
    db.ProjectEmployee.belongsTo(db.Employee);
  };