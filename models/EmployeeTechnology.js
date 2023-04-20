module.exports = (sequelize) => {
    const EmployeeTechnology = sequelize.define('EmployeeTechnology', {},
    {
      indexes: [
        {
          unique: true,
          fields: ['EmployeeId', 'TechnologyId']
        }
      ],
      foreignKeys: [
        {
          name: 'employeeTechnology_technologyId_fkey',
          fields: ['TechnologyId'],
          references: {
            table: 'technologies',
            field: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        {
          name: 'employeeTechnology_employeeId_fkey',
          fields: ['EmployeeId'],
          references: {
            table: 'employees',
            field: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      ]
    }
    );
  
    return EmployeeTechnology;
  };