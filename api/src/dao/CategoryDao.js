const {Category}= require('../db.js')


const findOrCreateCategory =async (id, name)=>{

    return await Category.findOrCreate({
        where: {externalId: id, name: name },
        defaults: {
          externalId: id,
          name: name
        }
      });
} 

module.exports = {
  findOrCreateCategory
}