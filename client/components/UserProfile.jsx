import React, { useState, useEffect } from 'react';
import {useAuth} from '../auth/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';

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
    let updateClub = true;
    if (updateClub){
      axios.get('http://localhost:8080/users/clubs', {headers: {
        'Authorization': `Bearer ${auth.token}` } 
      })
        .then((response) => {
          setClubs(response.data.clubs);
        });
    }
    return () => {return updateClub = false};
  }, []);



  // function getBookClub(club_id){
  //   console.log(club_id);
  // }
  const navigate =  useNavigate();
  return (
   <div className="userProfile">
      <img className="logo" src={Logo}/>
      <h1 className="welcome">Welcome to Booked, {auth.firstName}!</h1>
      <h2 className="welcome">A place to promote our love of literature in a positive, nurturing environment. </h2>
      <h2 className="leftText">MY CLUBS</h2>
      <ul className="list">
        {clubs.map((club) => (
          // key needs to be unique id
          <li  key={club.club_id}>
            <span className="clubName">{club.clubName}</span>{' '}
            <span className="clubDescription">{club.description}</span>
            {/* <button onClick={() => getBookClub(club.club_id)}>Open Book Club</button> */}
            <button  className="smallButton"  onClick={() => navigate(`/${club.club_id}`)}>Open</button>
          </li>
        ))}
      </ul>
      <button className="button" onClick = {() => setShow(!show)}>Create New Club</button>
      { show && <form className="createClub" id='createclub' onSubmit={(e) => createClub(e)} >
        <input type="text" placeholder="Club Name" value={clubName} onChange={(e)=> setClubName(e.target.value)}/>
        <textarea rows="4" cols="50" placeholder="Tell us about your club!" value={clubDescription} onChange={(e)=> setClubDescription(e.target.value)}></textarea>
        <button className="button" form='createclub' type='submit'  >Submit</button> <button className="button" onClick = {() => setShow(!show)}>Cancel</button> 
      </form> }
    </div>
  );
}

export default UserProfile;