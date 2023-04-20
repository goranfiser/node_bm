const ProjectService = require('../services/ProjectService');

class ProjectController {
  constructor() {
    this.projectService = new ProjectService();
  }

  async getAllProjects(req, res, next) {
    try {
      const projects = await this.projectService.getAllProjects();
      res.status(200).json(projects);
    } catch (err) {
      return next(err);
    }
  }

  async getProjectById(req, res, next) {
    const projectId = req.params.id;
    try {
      const project = await this.projectService.getProjectById(projectId);
      res.status(200).json(project);
    } catch (err) {
      return next(err);
    }
  }

  async createProject(req, res, next) {
    const projectData = req.body;console.log(projectData);
    try {
      const createdProject = await this.projectService.createOrUpdateEmployee(projectData, projectData.employees);
      res.status(201).json(createdProject);
    } catch (err) {
      return next(err);
    }
  }

  async updateProject(req, res, next) {
    const projectId = req.params.id;
    const projectData = req.body;
    try {
      const updatedProject = await this.projectService.createOrUpdateEmployee(projectData, projectData.employees, false, projectId);
      res.status(200).json(updatedProject);
    } catch (err) {
      return next(err);
    }
  }

  async deleteProject(req, res, next) {
    const projectId = req.params.id;
    try {
      await this.projectService.deleteProject(projectId);
      res.status(204).send();
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = ProjectController;
