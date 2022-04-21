import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../auth/authContext.js';
import Message from './Message.jsx';

function ClubMessages({ clubMessages, setClubMessages, memberId }) {
  const clubId = useParams();
  console.log(clubId);
  const auth = useAuth();

  const [messageFeild, setMessageFeild] = useState('')
  
  useEffect(async () => {
    let getMessagesInterval = setInterval(() => getClubMessages(), 15000);

    return () => {
      clearInterval(getMessagesInterval);
    };
    
  }, []);

  const getClubMessages = useCallback(async () => {
    try {
    const response = await fetch(`/messages/${clubId.id}`,{
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    const responseData = await response.json();
    setClubMessages(responseData.messages);
    } catch (err) {
      console.log('error getting club messages ->', err)
    }
  })  

  const postNewMessage = useCallback(async () => {
    try {
    const response = await fetch('/messages/new', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        member_id: memberId,
        message:  messageFeild,
      }),
    });

    getClubMessages();
    setMessageFeild('');
  } catch (err) {
    console.log('error posting message ->',err)
  }
  });

  // display all the messages in a scrollable div
  // input and send button
  return (
  <div id="message-component"> 
    <div id="message-submission">
      <textarea type="textarea" rows="2" value={messageFeild} onChange={(e)=> setMessageFeild(e.target.value)}/>
      <button className="button" onClick={postNewMessage}>Submit</button>
    </div>
    <div id="feed">
      {clubMessages.map(message => {
        return <Message key={message.message_id} username={message.user_name} message={message.message}/>
      })}
    </div>
  </div>
  )
}

export default ClubMessages;
