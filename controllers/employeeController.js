class EmployeeController {
  constructor({ employeeService }) {
    this.employeeService = employeeService;
  }

  async getAllEmployees(req, res) {
    try {
      const employees = await this.employeeService.getAllEmployees();
      return res.status(200).json(employees);
    } catch (error) {

      return res.status(500).json({ error: error.message });
    }
  }

  async getEmployeeById(req, res) {
    try {
      const { id } = req.params;
      const employee = await this.employeeService.getEmployeeById(id);
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      return res.status(200).json(employee);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async createEmployee(req, res, next) {
    try {
      const employee = await this.employeeService.createOrUpdateEmployee(null, req.body, req.file, true, req.body.skills);
      return res.status(201).json(employee);
    } catch (error) {
      return next(error);
    }
  }

  async updateEmployee(req, res, next) {
    try {
      const { id } = req.params;
      const employee = await this.employeeService.createOrUpdateEmployee(id, req.body, req.file, false, req.body.skills);

      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      return res.status(200).json(employee);
    } catch (error) {
      return next(error);
    }
  }

  async deleteEmployee(req, res) {
    try {
      const { id } = req.params;
      const result = await this.employeeService.deleteEmployee(id);
      if (!result) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = EmployeeController;