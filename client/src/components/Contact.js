import React, { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/contact", {
        name,
        email,
        subject,
        message,
      });
      console.log("Form submitted successfully!");
      console.log("Submitted data:", response.data);
      setSubmitted(true);
      // Clear form fields after successful submission
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const SuccessAnimation = () => (
    <div
      className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6"
      role="alert"
    >
      <strong className="font-bold">Success!</strong>
      <span className="block sm:inline"> Your message has been submitted.</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg
          className="fill-current h-6 w-6 text-green-500"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path d="M14.348 5.652a.5.5 0 0 0-.707 0L10 9.293 6.36 5.652a.5.5 0 1 0-.708.708L9.293 10l-3.64 3.64a.5.5 0 1 0 .708.708L10 10.707l3.64 3.64a.5.5 0 1 0 .708-.708L10.707 10l3.64-3.64a.5.5 0 0 0 0-.708z" />
        </svg>
      </span>
    </div>
  );

  return (
    <div
      id="contacts"
      className="bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg overflow-hidden shadow-lg"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 py-10 px-8 lg:p-12 bg-gradient-to-br from-blue-200 to-blue-300 flex flex-col justify-center items-center">
          <h1 className="text-blue-700 text-4xl lg:text-5xl font-bold mb-6 text-center">
            Have Questions? Get in Touch
          </h1>
          <p className="text-white text-lg mb-6 text-center">
            <a
              href="mailto:info@navigatebi.com"
              className="text-blue-600 font-medium"
            >
              Email: info@skillnaav.com
            </a>
          </p>
        </div>

        {/* Right Section */}
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-1/2 py-10 px-8 lg:p-12 bg-white shadow-lg rounded-lg"
        >
          <h2 className="text-blue-900 text-3xl lg:text-4xl font-bold mb-8 text-center">
            Contact Us
          </h2>
          {submitted && <SuccessAnimation />}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-800 mb-1"
            >
              Your Name*
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Your Name"
              className="w-full py-3 px-4 bg-gray-100 rounded-md text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-800 mb-1"
            >
              Your Email*
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              className="w-full py-3 px-4 bg-gray-100 rounded-md text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="subject"
              className="block text-lg font-medium text-gray-800 mb-1"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              placeholder="Your Question About.."
              className="w-full py-3 px-4 bg-gray-100 rounded-md text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-lg font-medium text-gray-800 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              placeholder="Your Message..."
              className="w-full py-3 px-4 bg-gray-100 rounded-md text-lg text-gray-800 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="py-4 px-8 bg-blue-500 rounded-md text-white text-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
