module.exports = (sequelize, DataTypes) => {
    const Technology = sequelize.define('Technology', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    return Technology;
  };