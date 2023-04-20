const TechnologyRepository = require('../repositories/TechnologyRepository');

class TechnologyService {
  constructor() {
    this.technologyRepository = new TechnologyRepository();
  }

  async getAllTechnologies() {
    try {
      const technologies = await this.technologyRepository.getAllTechnologies();
      return technologies;
    } catch (err) {
      throw new Error('Error retrieving technologies');
    }
  }

  async getTechnologyById(id) {
    try {
      const technology = await this.technologyRepository.getTechnologyById(id);
      if (!technology) {
        throw new Error('Technology not found');
      }
      return technology;
    } catch (err) {
      throw new Error('Error retrieving technology by ID');
    }
  }

  async createTechnology(technologyData) {
    try {
      console.log(technologyData);
      const technology = await this.technologyRepository.createTechnology(technologyData);
      return technology;
    } catch (err) {
      throw new Error('Error creating technology');
    }
  }

  async updateTechnology(id, technologyData) {
    try {
      return this.technologyRepository.updateTechnology(id, technologyData);
    } catch (err) {
      throw new Error('Error updating technology');
    }
  }

  async deleteTechnology(id) {
    try {
      const technology = await this.technologyRepository.getTechnologyById(id);
      if (!technology) {
        throw new Error('Technology not found');
      }
      await this.technologyRepository.deleteTechnology(id);
      return;
    } catch (err) {
      throw new Error('Error deleting technology');
    }
  }
}

module.exports = TechnologyService;
