const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('Photo', {
    url: {
      type: DataTypes.TEXT,
      allowNull: false,  
    }
    
  }, {
    timestamps:false
  });
};
