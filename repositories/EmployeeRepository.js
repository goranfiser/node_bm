const DuplicateEmailError = require('../errors/DuplicateEmailError');
const { Employee, Technology } = require('../models');

class EmployeeRepository {
    constructor() {
      this.Employee = Employee;
    }
  
    async findAll(id) {
      let where = {};
      if (id) {
        where = { id };
      }
      return this.Employee.findAll({
        where,
        include: {
          model: Technology,
          as: 'Technologies',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          through: { attributes: [] }
        }
      });
    }
  
    async findById(id) {
      return this.Employee.findByPk(id);
    }
  
    async create(data, options = {}) {
      let createdEmployee;
      try {
        createdEmployee = await this.Employee.create(data, { ...options });
      } catch (error) {
        if (error.parent.code === "ER_DUP_ENTRY") {
          throw new DuplicateEmailError('Email already in use');
        }
      }
      return createdEmployee;
    }
  
    async update(id, data, options = {}) {
      const employee = await this.Employee.findByPk(id);
      if (!employee) {
        throw new Error('Employee not found');
      }
      return await employee.update(data, { ...options });
    }
  
    async delete(id) {
      const employee = await this.Employee.findByPk(id);
      if (!employee) {
        throw new Error('Employee not found');
      }
      return employee.destroy();
    }
  }
  
  module.exports = EmployeeRepository;