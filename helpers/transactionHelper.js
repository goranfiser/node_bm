// const db = require('../models');

// class TransactionHelper {
//   static async executeTransaction(callback) {
//     const t = await db.sequelize.transaction();

//     try {
//       const result = await callback(t);
//       await t.commit();
//       return result;
//     } catch (error) {
//       await t.rollback();
//       throw error;
//     }
//   }
// }

// module.exports = TransactionHelper;


const BadRequestError = require('../errors/BadRequestError');
const { sequelize } = require('../models'); // assuming Sequelize models are defined in the '../models' folder

class TransactionHelper {
  static async runTransaction(callback) {
    const transaction = await sequelize.transaction();
    try {
      await callback(transaction);
      await transaction.commit();
      console.log('Transaction committed successfully');
    } catch (error) {
      await transaction.rollback();
      console.error('Transaction rolled back', error);
      throw new BadRequestError(error.name);
    }
  }
}

module.exports = TransactionHelper;