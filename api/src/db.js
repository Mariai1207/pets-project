require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const DB_USER= 'root';
const DB_PASSWORD='1234';
const DB_HOST='localhost:3306';
const sequelize = new Sequelize(`mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/petsdb`)
const basename = path.basename(__filename);

const modelDefiners = [];
fs.readdirSync(path.join(__dirname, '/models')) 
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')) 
  .forEach((file) => { 
    modelDefiners.push(require(path.join(__dirname, '/models', file))); 
  });


modelDefiners.forEach(model => model(sequelize)); 
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


const { Pet, Category, Photo, Tag } = sequelize.models; 
Pet.belongsTo(Category);
Pet.hasMany(Photo);
Pet.belongsToMany(Tag, {through:'Tags_Pets',  timestamps:false})
Tag.belongsToMany(Pet, {through:'Tags_Pets', timestamps:false})

 module.exports = {
    ...sequelize.models, 
    conn: sequelize,
  };