
import React, { useState, useRef } from 'react';
import * as Realm from "realm-web";

import './App.css';
import logo from './logo.png'; // Ensure you have a logo.svg in your src folder
import stella from './stella.svg';
function App() {

  const ContactForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
  
    const handleNameChange = (event) => setName(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handleMessageChange = (event) => setMessage(event.target.value);
  
    const submitForm = (event) => {
      event.preventDefault();
      setIsLoading(true);
      const app = new Realm.App({ id: "application-0-vnzqc" }); // Use your Realm app ID
      const credentials = Realm.Credentials.anonymous();
  
      app.logIn(credentials).then(user => {
        const mongodb = user.mongoClient("mongodb-atlas");
        const collection = mongodb.db("webapp").collection("visitors");
        return collection.insertOne({ name, email, message });
      })
      .then(() => {
        setIsSubmitted(true);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to submit form:", err);
        setIsLoading(false);
      });
    };
  
    return (
      <section id="contact">
        <h2>Get in Touch</h2>
        <p>Discover how our solutions can drive your business forward. Reach out to discuss your needs or start a project with us.</p>
        {!isSubmitted ? (
          <form onSubmit={submitForm}>
            <input type="text" placeholder="Your Name" required value={name} onChange={handleNameChange} disabled={isLoading} />
            <input type="email" placeholder="Your Email" required value={email} onChange={handleEmailChange} disabled={isLoading} />
            <textarea placeholder="Tell us how we can help" required value={message} onChange={handleMessageChange} disabled={isLoading}></textarea>
            <button type="submit" disabled={isLoading}>Submit</button>
            {isLoading && <div><div className='spinner'></div>Sending message...</div>}
          </form>
        ) : (
          <div className="thankYouMessage">Thank you for your interest. We will be in touch within 24 hours.</div>
        )}
      </section>
    );
  };
//contact form end
  const [showForm, setShowForm] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const stories = [
    {
      title: "Social Media Marketing Success Story",
      headline: "Turning Followers into Revenue Streams: A Luxury Brand's Journey to the Spotlight",
      description: "Before partnering with us, Stella struggled to gain visibility in the saturated online fashion market. Leveraging our network of Instagram pages with millions of followers, we crafted a targeted advertising campaign that catapulted their brand into the limelight. Our strategic posts and engaging content not only enhanced their digital presence but translated into a 300% increase in online sales within the first quarter. Stella is now a trending name in fashion, thanks to the power of precise, influential social media marketing.",
      img:stella,
      url: "https://www.instagram.com/stellamccartney/?hl=en"
    },
    {
      title: "Web and IT Solutions Success Story",
      headline: "DRM Connect: CMS",
      description: "DRM School faced challenges in managing great online communication and sharing updates and records between parents and school staff without compromising on data security. Our team dove deep into their IT infrastructure, delivering a comprehensive package of web solutions, a new much more user-friendly CRM, and cybersecurity enhancements. ",
    },
    {
      title: "Tax Consultancy Success Story",
      headline: "Global Tax Navigators: Unlocking Savings for a Tech Startup",
      description: "Navigating tax laws across different countries can be daunting, especially for businesses expanding internationally. , found themselves overwhelmed by tax complexities. Our tax consultancy team streamlined their tax return filings across four key markets, uncovering significant tax savings and compliance strategies. ",
      url: "#"
    }
  ];

  const storiesContainerRef = useRef(null);

  const scroll = (direction) => {
    if (storiesContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300; // Assuming each story is 300px wide
      storiesContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleIconClick = () => {
    setShowForm(true);
    // Optional: Smooth scroll to the contact form
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <button className="hamburger" onClick={() => setIsNavVisible(!isNavVisible)}>
        &#9776; {/* Hamburger Icon */}
      </button>
      <nav className={`${isNavVisible ? "nav-visible" : ""} navigation`}>
        <a href="#services">Services</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>

      <main>
        <section id="hero" className="hero-section">
          <h1>Welcome to Gignance</h1>
          <p>Your one-stop solution for IT, marketing, accounting, and consultancy services.</p>
        </section>
        <div className="message-icon" onClick={handleIconClick}>
        💬 <span className="icon-text">Get In Touch</span>
      </div>
        <section id="services" className="services-section">
          <h2>Our Services</h2>
          <div className="services-container">
            <div className="service-item">
              <h3>IT Solutions</h3>
              <p>Web development, data analysis, and more, tailored to your business needs.</p>
            </div>
            <div className="service-item">
              <h3>Global Marketing</h3>
              <p>Strategic marketing campaigns designed to enhance your digital presence.</p>
            </div>
            <div className="service-item">
              <h3>Accounting Expertise</h3>
              <p>Comprehensive accounting services for SMEs across the globe.</p>
            </div>
            <div className="service-item">
              <h3>Consultancy</h3>
              <p>Unlock your business potential with our expert consultancy services.</p>
            </div>
          </div>
        </section>

        {/* About Us */}
        <section id="about">
          <h2>About Us</h2>
          <p>Gignance, powered by Innovapulse Limited, is your global partner in IT, marketing, web development, and beyond. We're committed to propelling businesses forward through comprehensive remote freelancing solutions.</p>
        </section>

        <section id="testimonials" className="testimonials">
      <h2>Success Stories</h2>
      <div className="navigation-arrow left" onClick={() => scroll('left')}>&lt;</div>
      <div ref={storiesContainerRef} className="stories-container">
        {stories.map((story, index) => (
          <div key={index} className="story">
            <h3>{story.title}</h3>
            <img src={story.img}/>
            <h4>{story.headline}</h4>
            <p>{story.description}</p>
            <a href={story.url} target="_blank" rel="noopener noreferrer" className="story-link">Check here</a>
          </div>
        ))}
      </div>
      <div className="navigation-arrow right" onClick={() => scroll('right')}>&gt;</div>
    </section>

        {/* Get in Touch Section */}
        {<ContactForm/>}
        {/* Optional: Chat Box for Wider Screens - Toggle visibility based on 'showForm' */}
        {showForm && (
          <div className="chat-box">
            {/* Content directing users to the contact form or embedding the form directly */}
          </div>
        )}
      </main>

      <footer>
        <h3>Innovapulse Limited</h3>
        <p><b>mail@Gignance.com</b></p>
        <p>+919875000098 | +64225401142</p>
        <p>222 Waimea Road, Nelson, New Zealand, 7010</p>
      </footer>
    </div>
  );
}

export default App;
