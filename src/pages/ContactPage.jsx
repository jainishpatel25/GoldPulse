import React, { useState } from "react";
import "../styles/Contact.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Implement actual form submission, e.g. API call or email service
    alert("Message sent! We will get back to you shortly.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="contact-page w-100 p-5">
      <h2 className="contact-title">Contact Us</h2>
      <p className="contact-subtitle">
        We're here to help! Reach out with any questions or feedback.
      </p>

      <form className="contact-form" onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="contact-name" className="form-label">
            Your Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            className="form-control input-dark"
            placeholder="Enter your name"
            value={formData.name}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contact-email" className="form-label">
            Your Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            className="form-control input-dark"
            placeholder="Enter your email"
            value={formData.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contact-subject" className="form-label">
            Subject
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            className="form-control input-dark"
            placeholder="Enter the subject"
            value={formData.subject}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contact-message" className="form-label">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            className="form-control input-dark"
            rows="4"
            placeholder="Enter your message"
            value={formData.message}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-warning send-btn">
          Send Message
        </button>
      </form>

      <div className="contact-info">
        <h5>Contact Information</h5>
        <hr />
        <p>
          <strong>Email:</strong> support@goldtracker.com
        </p>
        <p>
          <strong>Phone:</strong> +1 (555) 123-4567
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
