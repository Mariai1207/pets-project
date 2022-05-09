const {petsByStatus, updatePet, findByPk, createPet, addTags, addPhotos, deletePet}= require('../dao/PetDao')
const {findOrCreateCategory}= require('../dao/CategoryDao')
const {createPhotos, deletePhotosById}= require('../dao/PhotoDao')
const {findOrCreateTag}= require('../dao/TagDao')

const { Router }= require('express');
const router = Router();

router.get('/pet/:petId', async(req, res)=>{
    const {petId} = req.params;

    const pet = await findByPk(petId)
    pet?res.status(200).send(pet):res.status(404).send('pet not found')   
    
})

router.get('/pets/findByStatus', async(req, res)=>{
   
    const {status}=req.query;
    const petFound = await petsByStatus(status)
    let response=[];
    petFound.forEach(element=>{
        let pet={
            id: element.externalId,
            category: {
                id: element.Category.externalId,
                name: element.Category.name
            },
            name: element.name,
            photoUrls: element.Photos.map(photo => photo.url),
            tags: element.Tags.map(tag =>  {
                return {
                    id:tag.externalId , name : tag.name 
                }
            }),
            status: element.status
        }
        response.push(pet)
    })
   
    status === 'pending'|| status === 'available' || status === 'sold'?res.status(200).send(response):res.status(400).send('invalid status value')
})


router.post('/pet/:petId', async (req,res)=>{
    const {petId} = req.params;
    const {name,status}= req.body

    const pet = await updatePet(petId, name, status)

    if(!pet){
        res.status(404).send('pet not found');
    }
    
    res.send(pet)

 })

router.post('/pet', async (req,res)=>{ 
    const {id, name,status, category, photoUrl, tag}=req.body;

    const foundCategory = await findOrCreateCategory(category.id, category.name)
    const photos=await createPhotos(photoUrl)
    const tags=await findOrCreateTag(tag)
    const CategoryId = foundCategory[0].dataValues.id
    let pet=await createPet(id, name , status , CategoryId )
    addPhotos(pet, photos)
    addTags(pet , tags.map(tag => tag[0].dataValues.id))

    const response = {
        id: id,
        category: {
            id: CategoryId,
            name: foundCategory[0].dataValues.name
        },
        name: pet.name,
        photoUrls: photos.map(photo => photo.url),
        tags: tags.map(tag =>  {
            return {
                id:tag[0].dataValues.id , name : tag[0].dataValues.name 
            }
        }),
        status: pet.status
    }
      res.send(response)

})


router.delete('/pet/:petId', async(req, res)=>{
    const {petId}= req.params
    deletePet(petId)
    res.status(200).send('se elimino')
})

router.put('/pet', async(req, res)=>{
    const {id,name,status, category, photoUrl, tag}= req.body

    const pet = await updatePet(id, name, status)

    if(!pet){
        res.status(404).send('pet not found');
    }

    const foundCategory = await findOrCreateCategory(category.id, category.name)
   
    await deletePhotosById(pet.id)
    const photos= await createPhotos(photoUrl)
    const tags= await findOrCreateTag(tag)
   
    addPhotos(pet, photos)
    addTags(pet, tags.map(tag => tag[0].dataValues.id))
  
    const response = {
        id: pet.dataValues.externalId,
        category: {
            id: foundCategory[0].dataValues.externalId,
            name: foundCategory[0].dataValues.name
        },
        name: pet.dataValues.name,
        photoUrls: photos.map(photo => photo.url),
        tags: tags.map(tag =>  {
            return {
                id:tag[0].dataValues.externalId , name : tag[0].dataValues.name 
            }
        }),
        status: pet.dataValues.status
    }
        res.send(response)
})


module.exports= router;