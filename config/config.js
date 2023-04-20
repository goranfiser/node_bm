require('dotenv').config();

module.exports = {
    development: {
        serverPort: process.env.PORT || 3000
    },
    test: {
    },
    production: {
    }
};
  