import React from 'react';
import './searchBar.css';


export function SearchBar ({searchById, searchByStatus}){
    const [stateInput, setStateInput]= React.useState('')
    
 
    function handleInput (e){
        e.preventDefault()
        setStateInput(e.target.value)
  
      }
   async function onSubmit(e){
        e.preventDefault(e)
       searchById(stateInput)
        setStateInput('')
    }
    
    async function handleChange(e){
        e.preventDefault(e)
       searchByStatus(e.target.value)
       
    }
    
        
    return(
        <div>            
            <form onSubmit={(e)=>onSubmit(e)}>
                <input
                type='text'
                autoComplete='off'
                placeholder='Search...'
                onChange={(e)=>handleInput(e)}
                value={stateInput}
                />
                <button type='submit'> Buscar mascota por Id</button>
            </form>
            <select className='select'onChange={(e) => handleChange(e)} >
                <option value="default">Buscar mascota por status</option>
                <option value='pending'> Pending </option>
                <option value='available'> Availble</option>
                <option value='sold'> Sold</option>
            </select>
        </div>
    )
}