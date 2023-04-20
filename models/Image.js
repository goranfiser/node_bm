module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
      filename: {
        type: DataTypes.STRING,
        allowNull: false
      },
      filepath: {
        type: DataTypes.STRING,
        allowNull: false
      },
      mimetype: {
        type: DataTypes.STRING,
        allowNull: true
      },
      size: {
        type: DataTypes.STRING,
        allowNull: true
      }
    });
  
    // Image.associate = (models) => {
    //   Image.belongsTo(models.Employee, { foreignKey: 'id' });
    // };
  
    return Image;
  };
  