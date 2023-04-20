const { Project, Employee, Technology } = require('../models');

class ProjectRepository {
  async getAllProjects(id) {
    let where = {};
    if (id) {
      where = { id };
    }
    return Project.findAll({
      where,
      include: {
        model: Employee,
        as: 'Employees',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        through: { attributes: [] },
        include: {
            model: Technology,
            as: 'Technologies',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            through: { attributes: [] }
          }
      }
    });
  }

  async getProjectById(id) {
    const project = await Project.findByPk(id);
    return project;
  }

  async createProject(projectData) {
    const project = await Project.create(projectData);
    return project;
  }

  async updateProject(id, projectData) {
    const project = await Project.findByPk(id);
    if (!project) {
      throw new Error('Project not found');
    }
    const updatedProject = await project.update(projectData);
    return updatedProject;
  }

  async deleteProject(id) {
    const project = await Project.findByPk(id);
    if (!project) {
      throw new Error('Project not found');
    }
    await project.destroy();
    return;
  }
}

module.exports = ProjectRepository;


// const { Project } = require('../models');
// const { NotFoundError } = require('../utils/errors');

// class ProjectRepository {
//   async getAll() {
//     try {
//       const projects = await Project.findAll();
//       return projects;
//     } catch (error) {
//       throw error;
//     }
//   }

//   async getById(id) {
//     try {
//       const project = await Project.findByPk(id);
//       if (!project) {
//         throw new NotFoundError('Project not found');
//       }
//       return project;
//     } catch (error) {
//       throw error;
//     }
//   }

//   async create(projectData) {
//     try {
//       const project = await Project.create(projectData);
//       return project;
//     } catch (error) {
//       throw error;
//     }
//   }

//   async update(id, projectData) {
//     try {
//       const project = await this.getById(id);
//       await project.update(projectData);
//       return project;
//     } catch (error) {
//       throw error;
//     }
//   }

//   async delete(id) {
//     try {
//       const project = await this.getById(id);
//       await project.destroy();
//     } catch (error) {
//       throw error;
//     }
//   }
// }

// module.exports = new ProjectRepository();

