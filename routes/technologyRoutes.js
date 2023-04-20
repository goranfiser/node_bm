const express = require('express');
const router = express.Router();

const { technologyController } = require('../config/dependencies');

const validateRequest = require('../middleware/validateRequestMiddleware');

const technologySchema = require('../schemas/technologies/technologyShema');
const validate = validateRequest(technologySchema);

/**
 * @swagger
 * /technologies:
 *   get:
 *     summary: Get all technologies
 *     description: Retrieve a list of all technologies.
 *     tags:
 *       - Technologies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A list of technologies
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: nodejs
 *       500:
 *         description: Internal server error
 */
router.get('/', technologyController.getAllTechnologies.bind(technologyController));

/**
 * @swagger
 * /technologies/{id}:
 *   get:
 *     summary: Get a technology by ID
 *     description: Retrieve a single technology by ID.
 *     tags:
 *       - Technologies
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID of the technology to retrieve
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Technology found and returned
 *       404:
 *         description: Technology not found
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Technology not found
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal server error
 */
router.get('/:id', technologyController.getTechnologyById.bind(technologyController));

/**
 * @swagger
 * /technologies:
 *   post:
 *     summary: Create a new technology
 *     description: Create a new technology record.
 *     tags:
 *       - Technologies
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Technology
 *         description: Technology object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: The name of the technology
 *             description:
 *               type: string
 *               description: A brief description of the technology
 *     responses:
 *       201:
 *         description: Technology created successfully
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: The ID of the newly created technology
 *             name:
 *               type: string
 *               description: The name of the newly created technology
 *             description:
 *               type: string
 *               description: A brief description of the newly created technology
 *       400:
 *         description: Bad Request
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Validation error
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal server error
 */
router.post('/', validate, technologyController.createTechnology.bind(technologyController));

/**
 * @swagger
 * /technologies/{id}:
 *   put:
 *     summary: Update a technology by ID
 *     description: Update a single technology by ID.
 *     tags:
 *       - Technologies
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID of the technology to update
 *         in: path
 *         required: true
 *         type: string
 *       - name: Technology
 *         description: Technology object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: Node.js
 *     responses:
 *       200:
 *         description: Technology updated successfully
 *       400:
 *         description: Invalid request body
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Invalid request body
 *       404:
 *         description: Technology not found
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Technology not found
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal server error
 */

router.put('/:id', technologyController.updateTechnology.bind(technologyController));

/**
 * @swagger
 * /technologies/{id}:
 *   delete:
 *     summary: Delete a technology by ID
 *     description: Delete a technology by the given ID.
 *     tags:
 *       - Technologies
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID of the technology to delete
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Technology successfully deleted
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Technology successfully deleted
 *       404:
 *         description: Technology not found
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Technology not found
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal server error
 */
router.delete('/:id', technologyController.deleteTechnology.bind(technologyController));

module.exports = router;
