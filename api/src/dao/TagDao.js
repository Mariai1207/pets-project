const {Pet, Category , Photo, Tag}= require('../db.js')


const findOrCreateTag =async (tag)=>{
    const tags=[]
    for(let value of tag){
      let tag= await Tag.findOrCreate({
          where:{name: value.name},
          defaults:{
              externalId:value.id,
              name: value.name
          }
      })
      tags.push(tag)
    }
    return tags
 } 


 module.exports = {
    findOrCreateTag
}