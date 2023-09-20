import React, { useState } from 'react';
import './NotifyMe.css';
import * as Realm from "realm-web";

// Initialize the Realm app here; replace "your-app-id" with the App ID found in the Realm UI
const app = new Realm.App({ id: "application-2-tsfsv" });

const NotifyMe = () => {
  
  // State to hold the email input
  const [email, setEmail] = useState("");
  
  // State to manage loading, success, and failure
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  
  const handleSubmit = async () => {
    setLoading(true); // Start loading
    setSuccess(false);
    setFailure(false);
    
    try {
      // Authenticate anonymously
      const user = await app.logIn(Realm.Credentials.anonymous());
      
      // Call the Realm function to save the email
      await user.functions.saveEmail({ email: email });
      
      setLoading(false); // Stop loading
      setSuccess(true); // Mark as successful
      
      // Clear the email input field
      setEmail("");
      
    } catch (error) {
      console.error("Failed to save email: ", error);
      
      setLoading(false); // Stop loading
      setFailure(true); // Mark as failed
    }
  };
  
  return (
    <div className="notify-me">
      <h2>Stay Updated</h2>
      <input 
        type="email" 
        placeholder="Enter your email" 
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit} disabled={loading}>
        Notify Me
      </button>

      {/* Display loading, success, and failure messages */}
      {loading && <p>Loading...</p>}
      {success && <p>Successfully subscribed!</p>}
      {failure && <p>Failed to subscribe. Try again.</p>}
    </div>
  );
};

export default NotifyMe;
