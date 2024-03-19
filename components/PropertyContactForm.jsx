"use client";
import { useState } from "react"; // Importing useState hook from React for state management.
import { FaPaperPlane } from "react-icons/fa"; // Importing paper plane icon from react-icons/fa library.
import { toast } from "react-toastify"; // Importing toast notification utility from 'react-toastify'.
import { useSession } from "next-auth/react"; // Importing a custom hook from Next.js for session management.

// Functional component for rendering a contact form for a property.
const PropertyContactForm = ({ property }) => {
  const { data: session } = useSession(); // Accessing session data using the useSession hook.

  // Initializing state variables for form fields and submission status.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [wasSubmitted, setWasSubmitted] = useState(false);

  // Function to handle form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      phone,
      message,
      recipient: property.owner,
      property: property._id,
    };

    try {
      const res = await fetch("/api/messages", {
        // Sending a POST request to submit the message.
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.status === 200) {
        // If request is successful, show success toast and set submission status to true.
        toast.success("Message sent successfully");
        setWasSubmitted(true);
      } else if (res.status === 400 || res.status === 401) {
        // Handling client-side errors.
        const dataObj = await res.json();
        toast.error(dataObj.message);
      } else {
        // Handling other errors.
        toast.error("Error sending form");
      }
    } catch (error) {
      // Handling errors if any occur during the process.
      console.log(error);
      toast.error("Error sending form");
    } finally {
      // Resetting form fields after submission attempt.
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
      {!session ? (
        <p>You must be logged in to send a message</p>
      ) : wasSubmitted ? (
        <p className="text-green-500 mb-4">
          Your message has been sent successfully
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
              id="message"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
              type="submit"
            >
              <FaPaperPlane className="mr-2" /> Send Message
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
export default PropertyContactForm;
