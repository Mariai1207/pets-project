import React from 'react';
import './addPet.css';
import axios from 'axios';

export function AddPet(){
    const [state, setState]= React.useState({
        tag:[], photoUrl:[]
    })
    const allTags=['macho', 'hembra', 'criollo', 'raza pequeña'];
    
    function handleChangeInput(e){
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }
    function handleChangeCategory(e){
        setState({
           ...state,
           category: {
               ...state.category,
               [e.target.name]:e.target.value
           }
        })
    }
    function handleChangeCheckbox(e){
        setState({
            ...state,
            tag:[...state.tag, {name:e.target.value}]
        })
    }
    function handleChangePhoto(e){
        setState({
            ...state,
            photoUrl:[...state.photoUrl, e.target.value]
        })
    }

    async function handleSubmit(e){
        e.preventDefault(e)
        const response= await axios.post('http://localhost:3001/pet/', state)
        console.log(response)

    }

    return(
        <div>
        <h2 className='titleAddPet'>
         Add Pet!
        </h2>
        
         <form className='form' onSubmit={(e) =>{handleSubmit(e)}} >
             <div className='position'>
                 <label htmlFor='id'>Id</label>
                 <input 
                 className='input'
                 id='id'
                 type='number'
                 size={100} 
                 name="id"
                 onChange={(e)=>handleChangeInput(e)}  />        
             </div>

             <div className='position'>
                 <label htmlFor='name'>Name Pet</label>
                 <input 
                 className='input'
                 id='name'
                 type='text'
                 size={100} 
                 name="name"
                 onChange={(e)=>handleChangeInput(e)}  />        
             </div>

           
        
             

             <div className='position'>
                 <label htmlFor='id' >category Id</label> 
                 <input  
                 className='input'
                 id='id'
                 type= 'number'            
                 size={100}
                 name="id"
                 onChange={(e)=>handleChangeCategory(e)}
                />       
             </div>
            
             
   
             <div className='position'>
                 <label htmlFor='name'>Name Category</label> 
                 <input className='input'
                 id='name'
                 type='text'                
                 size={100} 
                 name='name'
                 onChange={(e)=>handleChangeCategory(e)}
                />       
             </div>

            <div>
             
            </div>
            
             <div className='position'>
                 <label htmlFor='photoUrl'>Photo</label> 
                 <input
                 className='input'
                 id='photoUrl'
                 type='text'             
                 size={100} 
                 name="photoUrl" 
                 onChange={(e)=>handleChangePhoto(e)}
                />        
             </div>
           
            
             <select name='status' className='select'onChange={(e) => handleChangeInput(e)} >
                <option value="default">status</option>
                <option value='pending' > Pending </option>
                <option value='available'  > Availble</option>
                <option value='sold' > Sold</option>
            </select>

                {allTags.map((tag)=>(
                    <label key={tag}>
                        <input
                        type='checkbox'
                        value={tag}
                        name={tag}
                        onChange={(e)=>{handleChangeCheckbox(e)}}
                        />{tag}</label> 
                    ))}    

             <div >                    
                 <button className='buttonAdd' type='submit'>ADD</button>                     
             </div>
         </form>
     </div>
    )
}