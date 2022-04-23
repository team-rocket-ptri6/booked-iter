import React from "react";

export default function Message({ username, message, created_at }) {
  const timeFormatter = (datetime) => {
    const date = new Date(datetime);
    date.setHours(date.getHours() - 6);
    return date.toLocaleString("en-US", { timeZone: "America/New_York" });
  };
  return (
    <div className="message">
      <div className="message-header">
        <p className="message-username">
          <b>{username}</b>
        </p>
        <p className="message-created">{timeFormatter(created_at)}</p>
      </div>
      <p className="message-content">{message}</p>
    </div>
  );
}
