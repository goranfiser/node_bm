const express = require('express');
const router = express.Router();

const { projectController } = require('../config/dependencies');
const validateRequest = require('../middleware/validateRequestMiddleware');

const projectSchema  = require('../schemas/project/projectSchema');

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects
 *     description: Retrieve a list of all projects.
 *     tags:
 *       - Projects
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A list of projects
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               technologies:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *               updatedAt:
 *                 type: string
 *                 format: date-time
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal server error
 */

router.get('/', projectController.getAllProjects.bind(projectController));

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get a project by ID
 *     description: Retrieve a single project by ID.
 *     tags:
 *       - Projects
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID of the project to retrieve
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Project found and returned
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: The ID of the project
 *             name:
 *               type: string
 *               description: The name of the project
 *             description:
 *               type: string
 *               description: A brief description of the project
 *             startDate:
 *               type: string
 *               format: date
 *               description: The start date of the project
 *             endDate:
 *               type: string
 *               format: date
 *               description: The end date of the project
 *       404:
 *         description: Project not found
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Project not found
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal server error
 */
router.get('/:id', projectController.getProjectById.bind(projectController));

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     description: Create a new project with the specified details.
 *     tags:
 *       - Projects
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: project
 *         description: Project object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: The name of the project
 *               example: Project A
 *             description:
 *               type: string
 *               description: The description of the project
 *               example: This is a new project
 *     responses:
 *       201:
 *         description: Project created successfully
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: The unique identifier of the project
 *               example: 1
 *             name:
 *               type: string
 *               description: The name of the project
 *               example: Project A
 *             description:
 *               type: string
 *               description: The description of the project
 *               example: This is a new project
 *       400:
 *         description: Invalid request parameters
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Invalid request parameters
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal server error
 */
router.post('/', validateRequest(projectSchema), projectController.createProject.bind(projectController));

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Update a project by ID
 *     description: Update an existing project by ID.
 *     tags:
 *       - Projects
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID of the project to update
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         description: Project object to update
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: The name of the project
 *               example: Project A
 *             description:
 *               type: string
 *               description: The description of the project
 *               example: This is an updated project
 *         required:
 *           - name
 *     responses:
 *       200:
 *         description: Project updated successfully
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             name:
 *               type: string
 *               example: Project A
 *             description:
 *               type: string
 *               example: This is an updated project
 *       400:
 *         description: Invalid request parameters
 *       404:
 *         description: Project not found
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Project not found
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal server error
 */
router.put('/:id', validateRequest(projectSchema), projectController.updateProject.bind(projectController));

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Delete a project by ID
 *     description: Delete a single project by ID.
 *     tags:
 *       - Projects
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID of the project to delete
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Project not found
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal server error
 */
router.delete('/:id', projectController.deleteProject.bind(projectController));

module.exports = router;