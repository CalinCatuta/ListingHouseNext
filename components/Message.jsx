"use client";
import { useState, useEffect } from "react"; // Importing necessary hooks from React for state management and side effects.
import { toast } from "react-toastify"; // Importing toast notification utility from 'react-toastify'.
import { useGlobalContext } from "@/context/GlobalContext"; // Importing a custom hook from global context for managing application-wide state.

// Functional component for rendering individual messages.
const Message = ({ message }) => {
  // Initializing state variables for message read status and deletion status.
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);

  // Extracting function 'setUnreadCount' from global context.
  const { setUnreadCount } = useGlobalContext();

  // Function to handle marking a message as read.
  const handleReadClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        // Sending a PUT request to mark the message as read.
        method: "PUT",
      });

      if (res.status === 200) {
        // If request is successful...
        const { read } = await res.json(); // Extracting the 'read' status from response.
        setIsRead(read); // Updating local state with the 'read' status.
        setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1)); // Updating the unread count in global context based on read status.
        // Showing a success toast notification based on read status.
        if (read) {
          toast.success("Marked as read");
        } else {
          toast.success("Marked as new");
        }
      }
    } catch (error) {
      // Handling errors if any occur during the process.
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Function to handle message deletion.
  const handleDeleteClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        // Sending a DELETE request to delete the message.
        method: "DELETE",
      });

      if (res.status === 200) {
        // If request is successful...
        setIsDeleted(true); // Updating local state to mark message as deleted.
        setUnreadCount((prevCount) => prevCount - 1); // Updating unread count in global context.
        toast.success("Message Deleted"); // Showing a success toast notification for message deletion.
      }
    } catch (error) {
      // Handling errors if any occur during the process.
      console.log(error);
      toast.error("Message was not deleted");
    }
  };

  if (isDeleted) {
    // If message is deleted, return null to prevent rendering.
    return null;
  }

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span>{" "}
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {message.sender.username}
        </li>

        <li>
          <strong>Reply Email:</strong>{" "}
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{" "}
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong>{" "}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className={`mt-4 mr-3 ${
          isRead ? "bg-gray-300" : "bg-blue-500 text-white"
        } py-1 px-3 rounded-md`}
      >
        {isRead ? "Mark As New" : "Mark As Read"}
      </button>
      <button
        onClick={handleDeleteClick}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};
export default Message;
