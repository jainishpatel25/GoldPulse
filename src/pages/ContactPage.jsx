import React from "react";
import "../styles/Contact.css";

const ContactPage = () => {
  return (
    <div className="contact-page w-100 p-5">
      <h2 className="contact-title">Contact Us</h2>
      <p className="contact-subtitle">
        We're here to help! Reach out with any questions or feedback.
      </p>

      <form className="contact-form">
        <div className="mb-3">
          <label className="form-label">Your Name</label>
          <input type="text" className="form-control input-dark" placeholder="Enter your name" />
        </div>
        <div className="mb-3">
          <label className="form-label">Your Email</label>
          <input type="email" className="form-control input-dark" placeholder="Enter your email" />
        </div>
        <div className="mb-3">
          <label className="form-label">Subject</label>
          <input type="text" className="form-control input-dark" placeholder="Enter the subject" />
        </div>
        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea className="form-control input-dark" rows="4" placeholder="Enter your message"></textarea>
        </div>
        <button type="submit" className="btn btn-warning send-btn">Send Message</button>
      </form>

      <div className="contact-info">
        <h5>Contact Information</h5>
        <hr />
        <p><strong>Email:</strong> support@goldtracker.com</p>
        <p><strong>Phone:</strong> +1 (555) 123-4567</p>
      </div>
    </div>
  );
};

export default ContactPage;
