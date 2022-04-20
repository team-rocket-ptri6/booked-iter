import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../auth/authContext.js';
import Message from './Message.jsx';

function ClubMessages({ clubMessages, setClubMessages }) {
  const clubId = useParams();
  const auth = useAuth();

  const [messageFeild, setMessageFeild] = useState('')
  
  useEffect(async () => {
    let getMessagesInterval = setInterval(() => {
      getClubMessages()
    }, 15000);

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
      },
      body: JSON.stringify({
        member_id: '',
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
    <div id="feed">
      {clubMessages.map(message => {
        <Message username={message.user_name} message={message.message}/>
      })}
    </div>
    <div id="message-submission">
      <input type="textbox" value={messageFeild} onChange={(e)=> setMessageFeild(e.target.value)}/>
      <button onClick={postNewMessage}>Submit</button>
    </div>
  </div>
  )
}

export default ClubMessages;
