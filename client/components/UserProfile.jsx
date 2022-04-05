import React, { useState, useContext } from 'react';
import {useAuth} from '../auth/authContext';
import axios from 'axios';

function UserProfile(){
  const auth = useAuth();
  const [clubName, setClubName] = useState('');
  const [clubDescription, setClubDescription] = useState('');
  const [show, setShow] = useState(false);
  auth.firstName = 'Bob';
  auth.lastName = 'Saget';
  auth.description = 'I am super cool';

  function createClub (e){
    e.preventDefault();
    axios.post('http://localhost:8080/clubs/new', {
      clubName:clubName,
      clubDescription:clubDescription
    }).then((response) => {
      console.log(response);
    });
  }
 
  return (
    <div>
      <h1>user profile</h1>
      {/* <h2>User Image</h2> stretch goal */}
      
      <h2>Welcome {auth.firstName}</h2>
      {/*  */}
      <h2>Description </h2>
      <p>{auth.description}</p>
      {/*  */}
      {/* <h2>My Friends</h2> stretch goal
       */}
      <h2>My Clubs</h2>
      {/*  */}
      <button onClick = {() => setShow(!show)}>Create New Club</button>
      { show && <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={(e) => createClub(e)} >
        <input type="text" placeholder="Club Name" value={clubName} onChange={(e)=> setClubName(e.target.value)}/>
        <textarea rows="4" cols="50" placeholder="Tell us about your club!" value={clubDescription} onChange={(e)=> setClubDescription(e.target.value)}></textarea>
        <input type="text" placeholder="Add members" />
        <button type='submit'>submit</button> <button onClick = {() => setShow(show)}>cancel</button> 
      </form> }

     
    </div>
  );
}

export default UserProfile;