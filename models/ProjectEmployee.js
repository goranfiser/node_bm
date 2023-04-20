module.exports = (sequelize) => {
  const ProjectEmployee = sequelize.define('ProjectEmployee', {},
    {
      indexes: [
        {
          unique: true,
          fields: ['ProjectId', 'EmployeeId']
        }
      ],
      foreignKeys: [
        {
          name: 'projectEmployee_projectId_fkey',
          fields: ['ProjectId'],
          references: {
            table: 'projects',
            field: 'id'
          },
          onUpdate: 'CASCADE'
        },
        {
          name: 'projectEmployee_employeeId_fkey',
          fields: ['EmployeeId'],
          references: {
            table: 'employees',
            field: 'id'
          },
          onUpdate: 'CASCADE'
        }
      ]
    }
  );

  return ProjectEmployee;
};