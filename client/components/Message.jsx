import React from 'React';

export default function Message({username, message}) {
return (
  <div class="message">
    <div className="message-username">{username}</div>
    <div className="message-content">{message}</div>
  </div>
)
}