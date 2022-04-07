import React, { useState } from 'react';
import axios from 'axios';
// import { useAuth } from '..auth/authConext';

function ClubInfo() {
  //const auth = useAuth();

  const [clubDescription, setClubDescription] = useState('');

  //   const club = setClubName('Cool Club');
  const club = (id) => {
    axios
      .get(`http://localhost:8080/clubs/:${id}`, {
        clubName,
        clubDescription,
      })
      .then((response) => {
        //ADD WHAT WE NEED HERE
      });
  };

  return (
    <div>
      <h1>{club.clubName}</h1>
      <div>{club.clubDescription}</div>
      <div>Display Members</div>
      <button>Add Member</button>
      <button>Remove Member</button>
      <button>Edit Page</button>
    </div>
  );
}

export default ClubInfo;
