import axios from 'axios';
import React, { useEffect } from 'react';
import './App.css';
import { AddPet } from './components/addPet/addPet';
import {Nav} from './components/nav/nav'
import { Pets } from './components/pets/pets';
import { UpdatePet } from './components/updatePet/updatePet';

function App() {
 const[pet, setPet]=React.useState([]);
 const [addpet, setAddPet]=React.useState(false);
 const [stateUpdate, setStateUpdate]=React.useState(false);
 
 const getAllPets=async()=>{
   const allPets= await axios.get('http://localhost:3001/allPets/')
   setPet(allPets)
 }
 useEffect(() => {
  getAllPets()
}, [])

 const searchById= async (id)=>{
        const response=  await axios.get('http://localhost:3001/pet/'+ id)
        console.log(response.data)
        setPet( [response.data])
 }
 const searchByStatus = async (status)=>{
        const response=  await axios.get('http://localhost:3001/pets/findByStatus?status='+status)
        console.log(response.data)
        setPet(response.data)
}
const addPet= ()=>{
  setAddPet(true)
}
  const updatePet= (id)=>{
    console.log('true', id)
   setStateUpdate(id)
  }
  return (
    <div className="App">
        <Nav searchById={searchById} searchByStatus ={searchByStatus} addPet={addPet}/>
        {pet.length>0? <Pets pet={pet} updatePet={updatePet}/>:null}

        {addpet? <AddPet/>:null}
        {stateUpdate? <UpdatePet id={stateUpdate}/>:null}
 
    </div>
  );
}

export default App;
