const EmployeeRepository = require('../repositories/EmployeeRepository');
const EmployeeService = require('../services/EmployeeService');
const EmployeeController = require('../controllers/employeeController');

const TechnologyRepository = require('../repositories/TechnologyRepository');
const TechnologyService = require('../services/TechnologyService');
const TechnologyController = require('../controllers/technologyController');

const ProjectRepository = require('../repositories/ProjectRepository');
const ProjectService = require('../services/ProjectService');
const ProjectController = require('../controllers/projectController');

const UserController = require('../controllers/userController');

const { Employee, Technology, Project, User } = require('../models');

//Repositories
const employeeRepository = new EmployeeRepository(Employee);
const technologyRepository = new TechnologyRepository(Technology);
const projectRepository = new ProjectRepository(Project);
// Services
const employeeService = new EmployeeService({ employeeRepository });
const technologyService = new TechnologyService({ technologyRepository });
const projectService = new ProjectService({ projectRepository });
//Controllers
const employeeController = new EmployeeController({ employeeService });
const technologyController = new TechnologyController({ technologyService });
const projectController = new ProjectController({ projectService });
const userController = new UserController(User);

module.exports = {
  employeeController,
  employeeService,
  employeeRepository,
  technologyController,
  technologyService,
  technologyRepository,
  projectController,
  projectService,
  projectRepository,
  userController
};