import React from 'react';
import {Pet} from '../pet/pet.jsx'
import './pets.css';


export function Pets({pet, updatePet}){ 
    console.log(pet)

    return(
        <div className='cards'>
          {
          
          pet?pet.map(pet=> <Pet
                id={pet.id}
                name={pet.name}
                photos={pet.photoUrls}
                status={pet.status}
                category={pet.category.name}
                tags={pet.tags}
                updatePet={updatePet}
          
          
          />):null}
          
        </div>
    )
}