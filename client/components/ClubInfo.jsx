import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../auth/authContext';
import Logo from '../assets/logo.png';

function ClubInfo(props) {
  const auth = useAuth();
  const [clubName, setClubName] = useState('Super Awesome Book Club');
  const [clubDescription, setClubDescription] = useState('');
  const [members, setMembers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);
  const [editPage, setEditPage] = useState(false);
  const [addMember, setAddMember] = useState('');
  const [membersUpdated, setMembersUpdated] = useState(false);

  const params = useParams();
  let token;
  if (localStorage.user) token = localStorage.getItem('user');
  useEffect(()=>{
    axios.get(`http://localhost:8080/clubs/${params.id}`, {headers: {
      'Authorization': `Bearer ${token}` } 
    })
      .then((response) => {
        setClubName(response.data.club_name);
        setClubDescription(response.data.description);
        setMembers(response.data.members);
      });
  },[params.id, membersUpdated]);

  function postMember(e, action, member_id = '') {
    e.preventDefault();
    const body = {
      email: addMember,
      clubId: params.id,
    };
    if (action === 'remove') body.member_id = member_id;
    const options = {
      method: 'POST',
      headers: {
        'Authorization':`Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    };

    fetch(`http://localhost:8080/clubs/${action}`, options)
      .then(response => {
        setMembersUpdated(!membersUpdated);
        if (action === 'add') setAddMember('');
      })
      .catch(err => console.warn(err));
  };

  return (
    <div className="clubInfo">
      <Link to='/profile'><img className="logo" src={Logo}/></Link>
      <h1 className="clubTitle">{clubName}</h1>
      <br />

      <h2 className="leftText">About {clubName}</h2>
        <h3 className="descriptionText">{clubDescription}</h3>
      
     
      <h2 className="leftText">Who is reading with us?</h2>
      <ul className="members" >
        {members.map((peeps) => (<ul className="memberList" key={peeps.user_id}>
         
            {peeps.firstName}
            <span>
              {/* This button has no functionality. I added arrow just because it was hard to see */}
              {editPage ?
                <>
                  <br></br> <button className="smallButton" onClick={(e) => postMember(e, 'remove', peeps.member_id)}>Remove Member</button>
                  <button className="smallButton" onClick={() => alert('this needs to make member admin')} >Make Admin</button>
                </>
                : null}
            </span>
        </ul>))}
     </ul>
      {/* </div> */}
      {!isAdmin ? null :
        <>

          <form> {/* This is what I would put within the form brackets, but no function has been created yet: action="submit" onSubmit={onSubmit}*/}
            <input 
              className="input"
              type="email"
              value={addMember}
              placeholder='New member email'
              onChange={(e) => setAddMember(e.target.value, 'add')}
            />

            <button
              className="button"
              onClick={(e) => {
                postMember(e, 'add');
              }}
            >
              Add Member
            </button>
          </form>
          <button
            className="editButton"
            value={editPage}
            onClick={(e) => {
              e.preventDefault();
              setEditPage(!editPage);
            }}
          >
        Edit Club Page
          </button>
          {/* This button has no functionality */}
          <span> {editPage ? <button className="editButton" onClick={() => alert('this needs to edit description')} >Edit description</button> : null} </span>
          <br />
        </>}
        <br/>
    </div>
  );
}

export default ClubInfo;
