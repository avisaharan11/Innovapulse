import React from 'react';
import './NotifyMe.css';

const NotifyMe = () => {
  return (
    <div className="notify-me">
      <h2>Stay Updated</h2>
      <p>Enter your email to be notified when we launch.</p>
      <input type="email" placeholder="Email Address" />
      <button type="submit">Notify Me</button>
    </div>
  );
};

export default NotifyMe;
