import React from 'React';

export default function Message({username, message}) {
return (
  <div class="message">
    <div class="message-username">{username}</div>
    <div class="message-content">{message}</div>
  </div>
)
}