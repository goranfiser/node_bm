module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      image: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Images',
          key: 'id',
          onDelete: 'SET NULL'
        }
      }
    });
  
    return Employee;
  };