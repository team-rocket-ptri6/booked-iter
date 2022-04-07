import React, { useState, useContext } from 'react';
import {useAuth} from '../auth/authContext';
import axios from 'axios';

function UserProfile(){
  const auth = useAuth();
  const [clubName, setClubName] = useState('');
  const [clubDescription, setClubDescription] = useState('');
  const [show, setShow] = useState(false);
  const [clubs, setClubs] = useState([]);
  
  
  auth.firstName = 'Bob';
  auth.lastName = 'Saget';
  auth.description = 'I am super cool';

  async function createClub (e){
    e.preventDefault();
    axios.post('http://localhost:8080/clubs/new', {
      clubName:clubName,
      clubDescription:clubDescription
    }, {headers: {
      'Authorization': `Bearer ${auth.token}` } 
    }).then((response) => {
      if (response) {
        // const club_id = response.data.club_id; //use club_id as route path
        // setClubs(clubs.concat({
        //   id: response.data.club_id,
        //   name: response.data.club_name,
        //   description: response.data.description
        // }));
        // setClubs((prevClubs) => [
        //   ...prevClubs,
        //   {
        //     id: response.data.club_id,
        //     name: response.data.club_name,
        //     description: response.data.description
        //   },
        // ]);
        // console.log('THESE ARE YOUR CLUBS');
        // console.log(clubs);
      }
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
      <button onClick = {() => setShow(!show)}>Create New Club</button>
      { show && <form style={{display: 'flex', flexDirection: 'column'}} id='createclub' onSubmit={(e) => createClub(e)} >
        <input type="text" placeholder="Club Name" value={clubName} onChange={(e)=> setClubName(e.target.value)}/>
        <textarea rows="4" cols="50" placeholder="Tell us about your club!" value={clubDescription} onChange={(e)=> setClubDescription(e.target.value)}></textarea>
        <button form='createclub' type='submit'  >submit</button> <button onClick = {() => setShow(show)}>cancel</button> 
      </form> }
    </div>
  );
}

export default UserProfile;