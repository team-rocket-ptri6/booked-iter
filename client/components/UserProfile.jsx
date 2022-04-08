import React, { useState, useContext } from 'react';
import {useAuth} from '../auth/authContext';
import axios from 'axios';
import Small from '../assets/smalllogo.png'

const clubs = [
  {
    club_id: 47,
    member_id: 20,
    name: 'Kitty Club',
    description: 'Place to share books about cats and funny images'
  },
  {
    club_id: 1,
    member_id: 20,
    name: 'Rachelle Club',
    description: 'Love reading nonfiction'
  },
  {
    club_id: 5,
    member_id: 20,
    name: 'Patrick Club',
    description: 'Place to read books'
  }
];

function UserProfile(){
  const auth = useAuth();
  const [clubName, setClubName] = useState('');
  const [clubDescription, setClubDescription] = useState('');
  const [show, setShow] = useState(false);
  // const [clubs, setClubs] = useState([]);

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

  function getBookClub(club_id){
    console.log(club_id);
  }

  return (
    <div>
      <img className="small" src={Small}/>
      <h1 className="text">Welcome to Booked, {auth.firstName}!</h1>
      {/* <h2>User Image</h2> stretch goal */}
      <h2 className="leftText">A place to promote our love of literature in a positive, nurturing environment! </h2>
      {/* <h2>My Friends</h2> stretch goal*/}
      
      <h2 className="leftText">My Clubs</h2>
      <ul>
        {clubs.map((club) => (
          // key needs to be unique id
          <li key={club.club_id}>
            <span>name: {club.name}</span>{' '}
            <span>description: {club.description}</span>
            <button className="button" onClick={() => getBookClub(club.club_id)}>Open Book Club</button>
          </li>
        ))}
      </ul>

      <button className="button" onClick = {() => setShow(!show)}>Create New Club</button>
      { show && <form style={{display: 'flex', flexDirection: 'column'}} id='createclub' onSubmit={(e) => createClub(e)} >
        <input type="text" placeholder="Club Name" value={clubName} onChange={(e)=> setClubName(e.target.value)}/>
        <textarea rows="4" cols="50" placeholder="Tell us about your club!" value={clubDescription} onChange={(e)=> setClubDescription(e.target.value)}></textarea>
        <button className="button" orm='createclub' type='submit'  >Submit</button> <button className="button" onClick = {() => setShow(show)}>Cancel</button> 
      </form> }
    </div>
  );
}

export default UserProfile;