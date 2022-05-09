const {Pet, Category , Photo, Tag}= require('../db.js')


const createPhotos =async (photoUrl)=>{
    const photos= [];
    for(let value of photoUrl){
      let url= await Photo.create({
          url: value
      })
      photos.push(url)
    }
    return photos
 } 


 const deletePhotosById =async (petId)=>{
  await Photo.destroy({where:{PetId:petId}})
} 


 module.exports = {
    createPhotos,
    deletePhotosById
}