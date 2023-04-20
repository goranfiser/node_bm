const BadRequestError = require('../errors/BadRequestError');
const ImageHelper = require('../helpers/imageHelper');
const TransactionHelper = require('../helpers/transactionHelper');
const db = require("../models"); 

class EmployeeService {
  constructor({ employeeRepository }) {
    this.employeeRepository = employeeRepository;
  }

  async getAllEmployees() {
    return this.employeeRepository.findAll();
  }

  async getEmployeeById(id) {
    return this.employeeRepository.findAll(id);
  }

  async createOrUpdateEmployee(id, data, file, isCreate, skills) {
    let employee = null;

    await TransactionHelper.runTransaction(async (t) => {
      if (file) {
        const savedImage = await ImageHelper.saveImageToDatabase(file, { transaction: t });
        data.image = savedImage.id;
      }
  
      if (isCreate) {
        employee = await this.employeeRepository.create(data, { transaction: t });
      } else {
        employee = await this.employeeRepository.update(id, data, { transaction: t });
      }
  
      await employee.setTechnologies(skills, { transaction: t });      
    });
  
    return employee;
  }
  

  async createEmployee(data, file) {
    data.image = null;
    let createdEmployee = null;
    let t;
    try {
        t = await db.sequelize.transaction();

        if (file) {
          const savedImage = await ImageHelper.saveImageToDatabase(file, { transaction: t });
          data.image = savedImage.id;
        }

        createdEmployee = await this.employeeRepository.create(data, { transaction: t });

        if (data.skills && data.skills.length > 0) {
          await createdEmployee.addTechnologies(data.skills, { transaction: t });
        }      

        await t.commit();

    } catch (error) {
        if(t) {
          await t.rollback();
          throw new BadRequestError(error.message);
        }
    }
      return createdEmployee;
  }

  async updateEmployee(id, data, file) {
    let t;
    let updatedEmployee = null;
    try {
      t = await db.sequelize.transaction();
      
      if (file) {
        const savedImage = await ImageHelper.saveImageToDatabase(file, { transaction: t });
        data.image = savedImage.id;
      }

      updatedEmployee = await this.employeeRepository.update(id, data, { transaction: t });

      if (data.skills && data.skills.length > 0) {
        await updatedEmployee.addTechnologies(data.skills, { transaction: t });
      }  
      
      await t.commit();

    } catch (error) {
      if (t) {
        // console.log(error);
        await t.rollback();
        throw new BadRequestError(error.message);
      }
    }
    return this.employeeRepository.update(id, data);

  }

  async deleteEmployee(id) {
    return this.employeeRepository.delete(id);
  }
}

module.exports = EmployeeService;