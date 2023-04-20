const db = require('../models');

class ImageHelper {
  static async saveImageToDatabase(file, options = {}) {
    try {
      const image = await db.Image.create({
        filename: file.filename,
        filepath: file.path,
        mimetype: file.mimetype,
        size: file.size
      }, { ...options });
      return image;
    } catch (err) {
      throw new Error('Failed to save image to database');
    }
  }
}

module.exports = ImageHelper;