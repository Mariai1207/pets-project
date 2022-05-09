import React from 'react';
import { SearchBar } from '../search Bar/searchBar';
import add from '../../img/add.png'
import goBack from '../../img/goBack.png'
import './nav.css';

export function Nav ({searchById, searchByStatus, addPet}){


   
    return(
        <div className='NavBar'>       
            <h3>Pet Store </h3>     
            <div className='SearchBar'>
                 <SearchBar searchById={searchById} searchByStatus ={searchByStatus}/>
            </div>
            <div className='goBack'>
                    <img id= 'goBack' src={goBack} alt='goBack'/>
              
            </div>  
            <div className='AddRecipe'>
        
               <button onClick={()=>addPet()}> <img id= 'addRecipe' src={add} alt='add'/> </button> 
    
            </div>
            
        </div>
    )
}