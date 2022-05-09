const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('Tag', {
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
