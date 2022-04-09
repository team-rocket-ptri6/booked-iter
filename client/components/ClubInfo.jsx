import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../auth/authContext';
import BookPanel from './BookPanel';

const members = [
  {
    user_id: 42,
    firstName: 'Patrick',
    LastName: 'Reid'
  },
  {
    user_id: 18,
    firstName: 'Rachelle',
    LastName: 'M'
  },
  {
    user_id: 7,
    firstName: 'Nidhi',
    LastName: 'Kasireddy'
  },
  {
    user_id: 1,
    firstName: 'Flora',
    LastName: 'Yufei'
  },
  {
    user_id: 14,
    firstName: 'Jon',
    LastName: 'Haviv'
  },
];

// let about = 'iramisu gummi bears tootsie roll gingerbread chocolate bar sweet roll. Shortbread fruitcake sweet cheesecake shortbread. Jujubes dragée biscuit apple pie cotton candy cake gummi bears pudding. ';

function ClubInfo(props) {
  const auth = useAuth();
  const [clubName, setClubName] = useState('Super Awesome Book Club');
  const [clubDescription, setClubDescription] = useState('');
  const [members, setMembers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);
  const [editPage, setEditPage] = useState(false);
  const [addMember, setAddMember] = useState();

  const params = useParams();
  useEffect(()=>{
    axios.get(`http://localhost:8080/clubs/${params.id}`, {headers: {
      'Authorization': `Bearer ${auth.token}` } 
    })
      .then((response) => {
        setClubName(response.data.club_name);
        setClubDescription(response.data.description);
        setMembers(response.data.members);
      });
  },[params.id]);

  //   const club = setClubName('Cool Club');
  // const club = (id) => {
  //   axios
  //     .get(`http://localhost:8080/clubs/:${id}`, {
  //       clubName,
  //       clubDescription,
  //     })
  //     .then((response) => {
  //       console.log(response)
  //       //ADD WHAT WE NEED HERE
  //     });
  // };

  return (
    <div>
        
      <h1>{clubName}</h1>

      <br />

      <div>

        <h2>A Little about {clubName}</h2>
        <button
          className="button"
          value={editPage}
          onClick={(e) => {
            e.preventDefault();
            setEditPage(!editPage);
          }}
        >
          Edit Club Page
        </button>

        <p>{clubDescription}</p>


        {/* This button has no functionality */}
        <span> {editPage ? <button onClick={() => alert('this needs to edit description')} >Edit description</button> : null} </span>
      </div>
      <br />

      <div>
        <p>Who is reading with us?</p>
        {members.map((peeps) => (<ul key={peeps.user_id}>
          <ul>
            {peeps.firstName}
            <span>
              {/* This button has no functionality. I added arrow just because it was hard to see */}
              {editPage ?
                <>
                  <br></br> <button className="button" onClick={() => alert('this needs to remove a member')} >remove member</button>
                  <span></span> <button className="button" onClick={() => alert('this needs to make member admin')} >make admin</button>
                </>
                : null}
            </span>
          </ul>
        </ul>))}

      </div>
      <br />


      {!isAdmin ? null :
        <>

          <form> {/* This is what I would put within the form brackets, but no function has been created yet: action="submit" onSubmit={onSubmit}*/}
            <input
              className="text"
              type="email"
              value={addMember}
              placeholder='New member email'
              onChange={(e) => setAddMember(e.target.value)}
            />

            <button
              className="button"
              onClick={(e) => {
                e.preventDefault();
                alert('this submits a request to add member. I figured email would be the best look up')
              }}
            >
              Add Member
            </button>
          </form>
          <br />
          <BookPanel />
        </>}
    </div>
  );
}

export default ClubInfo;
