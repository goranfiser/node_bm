const express = require('express');
const router = express.Router();

const { employeeController } = require('../config/dependencies');
const { upload } = require('../middleware/imageMiddleware');
const validateRequest = require('../middleware/validateRequestMiddleware');

const employeeSchema = require('../schemas/employee/employeeSchema');
const validate = validateRequest(employeeSchema);

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Create a new employee
 *     description: Use this route to create a new employee.
 *     tags:
 *       - Employees
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: image
 *         in: formData
 *         description: Image of the employee
 *         type: file
 *       - name: name
 *         in: formData
 *         description: Name of the employee
 *         type: string
 *       - name: email
 *         in: formData
 *         description: Email address of the employee
 *         type: string
 *       - name: skills
 *         in: formData
 *         description: List of skills of the employee
 *         type: array
 *         items:
 *           type: integer
 *     responses:
 *       201:
 *         description: Employee created successfully
 *       400:
 *         description: Invalid employee data
 */
router.post('/', upload.single('image'), validate, employeeController.createEmployee.bind(employeeController));

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get all employees
 *     description: Retrieve a list of all employees
 *     tags:
 *       - Employees
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A list of employees
 *         schema:
 *           type: array
 *           items:
 *            type: object
 *            properties:
 *             name:
 *               type: string
 *               description: The name of the employee
 *               example: John Doe
 *             email:
 *               type: string
 *               description: The email of the employee
 *               example: john.doe@example.com
 *             image:
 *               type: string
 *               description: The image of the employee
 *             skills:
 *               type: array
 *               items:
 *                 type: integer
 *               description: The skills of the employee
 *               example: [1, 2, 3]
 *       400:
 *         description: Invalid request parameters
 *       500:
 *         description: Internal server error
 */
router.get('/', employeeController.getAllEmployees.bind(employeeController));

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     description: Retrieve a single employee by ID.
 *     tags:
 *       - Employees
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID of the employee to retrieve
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Employee found and returned
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: The name of the employee
 *               example: John Doe
 *             email:
 *               type: string
 *               description: The email of the employee
 *               example: john.doe@example.com
 *             image:
 *               type: string
 *               format: binary
 *               description: The image of the employee
 *             skills:
 *               type: array
 *               items:
 *                 type: integer
 *               description: The skills of the employee
 *               example: [1, 2, 3]
 *       404:
 *         description: Employee not found
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Employee not found
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal server error
 */
router.get('/:id', employeeController.getEmployeeById.bind(employeeController));

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     summary: Update an employee by ID
 *     description: Update an employee's information by providing their ID and new details
 *     tags:
 *       - Employees
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the employee to update
 *         required: true
 *         type: string
 *       - name: image
 *         in: formData
 *         description: Image of the employee
 *         type: file
 *       - name: name
 *         in: formData
 *         description: Name of the employee
 *         type: string
 *       - name: email
 *         in: formData
 *         description: Email address of the employee
 *         type: string
 *       - name: skills
 *         in: formData
 *         description: List of skills of the employee
 *         type: array
 *         items:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad request
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */

router.put('/:id', upload.single('image'), validate, employeeController.updateEmployee.bind(employeeController));

/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     summary: Delete an employee by ID
 *     tags:
 *       - Employees
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the employee to delete
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */

router.delete('/:id', employeeController.deleteEmployee.bind(employeeController));

module.exports = router;