import React, { useState, useEffect } from 'react';
import {useAuth} from '../auth/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserProfile(){
  const auth = useAuth();
  const [clubName, setClubName] = useState('');
  const [clubDescription, setClubDescription] = useState('');
  const [show, setShow] = useState(false);
  const [clubs, setClubs] = useState([]);

  async function createClub (e){
    e.preventDefault();
    axios.post('http://localhost:8080/clubs/new', {
      clubName:clubName,
      clubDescription:clubDescription
    }, {headers: {
      'Authorization': `Bearer ${auth.token}` } 
    }).then((response) => {
      if (response) {
        console.log('Successfully created club!');
      }
    });
  }

  useEffect(()=>{
    axios.get('http://localhost:8080/users/clubs', {headers: {
      'Authorization': `Bearer ${auth.token}` } 
    })
      .then((response) => {
        setClubs(response.data.clubs);
      });
  }, []);



  // function getBookClub(club_id){
  //   console.log(club_id);
  // }
  const navigate =  useNavigate();
  return (
    <div>
      <h1>Welcome To MyBookClub.com,  {auth.firstName}!</h1>
      {/* <h2>User Image</h2> stretch goal */}
      <h2>A place to promote our love of literature in a positive, nurturing environment! </h2>
      {/* <h2>My Friends</h2> stretch goal*/}
      <h2>My Clubs</h2>
      <ul>
        {clubs.map((club) => (
          // key needs to be unique id
          <li key={club.club_id}>
            <span>name: {club.clubName}</span>{' '}
            <span>description: {club.description}</span>
            {/* <button onClick={() => getBookClub(club.club_id)}>Open Book Club</button> */}
            <button onClick={() => navigate(`/${club.club_id}`)}>Open Book Club</button>
          </li>
        ))}
      </ul>
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