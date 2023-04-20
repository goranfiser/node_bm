const ProjectRepository = require('../repositories/ProjectRepository');
const TransactionHelper = require('../helpers/transactionHelper');

class ProjectService {
  constructor() {
    this.projectRepository = new ProjectRepository();
  }

  async getAllProjects() {
    try {
      const projects = await this.projectRepository.getAllProjects();
      return projects;
    } catch (err) {
      throw new Error('Error retrieving projects');
    }
  }

  async getProjectById(id) {
    try {
      const project = await this.projectRepository.getAllProjects(id);
      if (!project) {
        throw new Error('Project not found');
      }
      return project;
    } catch (err) {
      throw new Error('Error retrieving project by ID');
    }
  }

  async createOrUpdateEmployee(projectData, employees, isCreate = true, id = null, ) {
    let project = null;

    await TransactionHelper.runTransaction(async (t) => {

      if (isCreate) {
        project = await this.projectRepository.createProject(projectData, { transaction: t });
      } else {
        project = await this.projectRepository.updateProject(id, projectData, { transaction: t });
      }
  
      await project.setEmployees(employees, { transaction: t });      
    });
  
    return project;
  }

  async createProject(projectData) {
    try {
      const project = await this.projectRepository.createProject(projectData);
      return project;
    } catch (err) {
      throw new Error('Error creating project');
    }
  }

  async updateProject(id, projectData) {
    try {
      const updatedProject = await this.projectRepository.updateProject(id, projectData);
      return updatedProject;
    } catch (err) {
      throw new Error('Error updating project');
    }
  }

  async deleteProject(id) {
    try {
      const project = await this.projectRepository.getProjectById(id);
      if (!project) {
        throw new Error('Project not found');
      }
      await this.projectRepository.deleteProject(id);
      return;
    } catch (err) {
      throw new Error('Error deleting project');
    }
  }
}

module.exports = ProjectService;
