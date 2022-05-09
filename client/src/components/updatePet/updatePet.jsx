import React from 'react';
import axios from 'axios';

export function UpdatePet(id){
    const [state, setState]= React.useState({
       id: id.id,
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
        console.log(state)
        const response= await axios.put('http://localhost:3001/pet/', state)
       console.log(response)

    }
    async function handleSubmit2(e, id){
        e.preventDefault(e)
        console.log(state)
        const response= await axios.post('http://localhost:3001//pet/'+id, state)
       console.log(response)

    }

    return (
        <div>
        <h2 className='titleAddPet'>
         Update All Pet !
        </h2>
        
         <form className='form' onSubmit={(e) =>{handleSubmit(e)}} >
             <div className='position'>
                 <label htmlFor='id'>Id</label>
                 <input 
                 className='input'
                 id='id'
                 placeholder= {id.id}
                 type='number'
                 size={100} 
                 name="id"
                 disabled= 'true'
                  />        
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
                 <button className='buttonAdd' type='submit'>Update</button>                     
             </div>
         </form>

         <h2 className='titleAddPet'>
         Update Pet !
        </h2>

         <form className='form' onSubmit={(e) =>{handleSubmit2(e, id.id)}} >
             <div className='position'>
                 <label htmlFor='id'>Id</label>
                 <input 
                 className='input'
                 id='id'
                 placeholder= {id.id}
                 type='number'
                 size={100} 
                 name="id"
                 disabled= 'true'
                  />        
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
           
            
             <select name='status' className='select'onChange={(e) => handleChangeInput(e)} >
                <option value="default">status</option>
                <option value='pending' > Pending </option>
                <option value='available'  > Availble</option>
                <option value='sold' > Sold</option>
            </select>

                

             <div >                    
                 <button className='buttonAdd' type='submit'>Update</button>                     
             </div>
         </form>
     </div>
    )
}