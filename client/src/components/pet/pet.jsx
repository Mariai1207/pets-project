import React from 'react';
import axios from 'axios';
import './pet.css';



export function Pet ({id, name, status, category, photos, tags, updatePet}){   
  
    const deletePet= async(e, id)=>{
        e.preventDefault(e)
        console.log(id)
        await axios.delete('http://localhost:3001/pet/'+ id)
        
    }
    return(
        <div className='container'>
           
            <div className='card'>  
           
              
                <figure>       
                    <img className='image' src={photos[0]} alt='' />                
                </figure>            
                <div className='info'>
                    <h1>{name}</h1>  
                   
                </div>
                <div>
                <h3>category: {category}</h3>
                </div>
                <div >
                    {tags.map(tag=> <p className='tex' key={tag}>{tag.name}</p>)}
                    
                </div>   
                <button className='button'>{status}</button> 
                <button className='button3'onClick={()=>updatePet(id)} >update</button> 
                <button className='button2' onClick={(e)=>deletePet(e,id)}>delete</button> 
                
                
            </div>  
        </div>
    )
}