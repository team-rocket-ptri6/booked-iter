import React from "react";

export default function Message({ username, message, created_at }) {
  return (
    <div className="message">
      <div className="message-header">
        <p className="message-username">
          <b>{username}</b>
        </p>
        <p className="message-created">{created_at}</p>
      </div>
      <p className="message-content">{message}</p>
    </div>
  );
}
