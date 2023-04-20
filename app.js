const express = require('express');
const app = express();
const db = require('./models');
const errorHandler = require("./middleware/errorHandlerMiddleware");
const swaggerUi = require('swagger-ui-express');
const employeeRoutes = require('./routes/employeeRoutes');
const technologiesRoutes = require('./routes/technologyRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const swaggerFile = require('./config/swagger');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.js')[env];
// const auth = require('./middleware/jwtMiddleware');

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// app.use('/employees', auth(), employeeRoutes);
app.use('/employees', employeeRoutes);
app.use('/technologies', technologiesRoutes);
app.use('/projects', projectRoutes);
app.use('/users', userRoutes);

app.use(errorHandler);

db.sequelize.sync().then(() => {
  app.listen(config.serverPort, () => {
    console.log(`Server is running on port  ${config.serverPort}`);
  });
}).catch((err) => {
  console.error('Unable to sync the database:', err);
});