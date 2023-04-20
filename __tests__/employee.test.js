// const EmployeeService = require('../services/EmployeeService');
// const EmployeeRepository = require('../repositories/EmployeeRepository');

// const employeeRepository = new EmployeeRepository();

// test('should return all employees', async () => {
//   const employeeService = new EmployeeService({ employeeRepository });
//   const employees = await employeeService.getAllEmployees();
//   expect(employees).toHaveLength(1);
// });

const faker = require('jest-faker');
const EmployeeService = require('../services/EmployeeService');
const EmployeeRepository = require('../repositories/EmployeeRepository');

const employeeRepository = new EmployeeRepository();

describe('EmployeeService', () => {
  let employeeService;

  beforeAll(() => {
    employeeService = new EmployeeService({ employeeRepository });
  });

  test('should return all employees', async () => {
    const employees = await faker.fakeData([{ name: 'name.firstName' }, { name: 'name.lastName' }], 10);
    await employeeRepository.bulkCreateEmployees(employees);
    const result = await employeeService.getAllEmployees();
    expect(result).toHaveLength(10);
  });
});
