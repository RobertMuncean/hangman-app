import React from "react";

const Notifications = (props) => {
  const { showNotification } = props;

  return (
    <div className={`notification-container ${showNotification ? "show" : ""}`}>
      <p>You've already entered this letter, try another one !</p>
    </div>
  );
};

export default Notifications;
