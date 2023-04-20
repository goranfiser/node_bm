const { Technology } = require('../models');

class TechnologyRepository {
    constructor() {
        this.Technology = Technology;
    }

    async getAllTechnologies() {
        try {
            const technologies = await this.Technology.findAll();
            return technologies;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getTechnologyById(id) {
        try {
            const technology = await this.Technology.findByPk(id);
            if (!technology) {
                throw new Error('Technology not found');
            }
            return technology;
        } catch (error) {
            throw new Error(error);
        }
    }

    async createTechnology(name) {
        try {
            const technology = await this.Technology.create(name);
            return technology;
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateTechnology(id, data) {
        try {
            const technology = await this.Technology.findByPk(id);
            if (!technology) {
                throw new Error('Technology not found');
            }
            return await technology.update(data);
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteTechnology(id) {
        try {
            const technology = await this.Technology.findByPk(id);
            if (!technology) {
                throw new Error('Technology not found');
            }
            await technology.destroy();
            return true;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = TechnologyRepository;
