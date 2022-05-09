const {Pet, Category , Photo, Tag}= require('../db.js')


const petsByStatus =async (status)=>{

   return await Pet.findAll({
        where:{
            status:status
        },
        include:[
            {
            model: Category,
            attributes:['id','name']
            },
            {
            model: Photo,
            attributes:['url']
            },
            {
            model: Tag,
            attributes:['name']
            }
        ],
        attributes:['id','name', 'status','externalId']
    })
} 

const petsFindAll =async ()=>{
    return await Pet.findAll({
        include:[
            {
            model: Category,
            attributes:['id','name']
            },
            {
            model: Photo,
            attributes:['url']
            },
            {
            model: Tag,
            attributes:['name']
            }
        ],
        attributes:['id','name', 'status','externalId']
    })
 } 


 const updatePet =async (externalId, name, status)=>{
    const pet = await Pet.findOne({ where: { externalId: externalId } })

    if(!pet){
       return undefined
    }
    
    pet.name = name;
    pet.status = status;

    pet.save();

    return pet
 } 

 const createPet =async (externalId,name,status,CategoryId)=>{
    return await Pet.create({
        externalId,
        name,
        status,
        CategoryId
    } )
 } 

 const addPhotos = async (pet, photos)=>{
     pet.addPhoto(photos);
 } 

 const addTags = async (pet, tags)=>{
    pet.addTag(tags);
} 

const deletePet = async (externalId)=>{
    await Pet.destroy({where:{
        externalId
    }})
} 

 const findByPk =async (petId)=>{
    const key = await Pet.findOne({where:{externalId: petId}})
    if(key){
    const pet = await Pet.findByPk(key.id,{include:[
        {
        model: Category,
        attributes:['externalId','name']
        },
        {
        model: Photo,
        attributes:['url']
        },
        {
        model: Tag,
        attributes:{exclude: ['Tags_Pets'] }
        }
    ],
    attributes:['externalId','name', 'status']});

    const response = {
        id: pet.externalId,
        category: {
            id: pet.Category.externalId,
            name: pet.Category.name
        },
        name: pet.name,
        photoUrls: pet.Photos.map(photo => photo.url),
        tags: pet.Tags.map(tag =>  {
            return {
                id:tag.externalId , name : tag.name 
            }
        }),
        status: pet.status
    }
    return response
 }else{
     return null
 }
}

module.exports = {
    petsByStatus,
    petsFindAll,
    updatePet,
    findByPk,
    createPet,
    addPhotos,
    addTags,
    deletePet
}