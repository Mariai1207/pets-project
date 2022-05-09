const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('Pet', {
    externalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    status:{
        type: DataTypes.STRING,
        allowNull: false,
    }
    
  }, {
    timestamps:false
  });
};

  