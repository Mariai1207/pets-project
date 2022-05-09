const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('Category', {
    externalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
    
  }, {
    timestamps:false
  });
};
