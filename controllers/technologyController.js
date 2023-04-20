const TechnologyService = require('../services/TechnologyService');

class TechnologyController {
  constructor() {
    this.technologyService = new TechnologyService();
  }

  getAllTechnologies = async (req, res) => {
    try {
      const technologies = await this.technologyService.getAllTechnologies();
      res.status(200).json(technologies);
    } catch (error) {
      return next(err);
    }
  }

  getTechnologyById = async (req, res) => {
    try {
      const technology = await this.technologyService.getTechnologyById(req.params.id);
      if (technology) {
        res.status(200).json(technology);
      } else {
        res.status(404).json({ message: 'Technology not found' });
      }
    } catch (error) {
      return next(err);
    }
  }

  createTechnology = async (req, res) => {
    try {
      const technology = await this.technologyService.createTechnology(req.body);
      res.status(201).json(technology);
    } catch (error) {
      return next(err);
    }
  }

  updateTechnology = async (req, res) => {
    try {
      const technology = await this.technologyService.getTechnologyById(req.params.id);
      if (technology) {
        const updatedTechnology = await this.technologyService.updateTechnology(req.params.id, req.body);
        res.status(200).json(updatedTechnology);
      } else {
        res.status(404).json({ message: 'Technology not found' });
      }
    } catch (error) {
      return next(err);
    }
  }

  deleteTechnology = async (req, res) => {
    try {
      const technology = await this.technologyService.getTechnologyById(req.params.id);
      if (technology) {
        await this.technologyService.deleteTechnology(req.params.id);
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'Technology not found' });
      }
    } catch (error) {
      return next(err);
    }
  }
}

module.exports = TechnologyController;
