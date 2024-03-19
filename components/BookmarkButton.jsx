"use client";
import { useState, useEffect } from "react"; // Importing necessary hooks from React for state management and side effects.
import { useSession } from "next-auth/react"; // Importing a custom hook from Next.js for session management.
import { toast } from "react-toastify"; // Importing toast notification utility from 'react-toastify'.
import { FaBookmark } from "react-icons/fa"; // Importing bookmark icon from react-icons/fa library.

// Functional component for rendering bookmark button for a property.
const BookmarkButton = ({ property }) => {
  const { data: session } = useSession(); // Accessing session data using the useSession hook.
  const userId = session?.user?.id; // Extracting user id from session data if available.

  // Initializing state variables for bookmark status and loading state.
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      // If user is not logged in, set loading state to false and return.
      setLoading(false);
      return;
    }

    // Function to check bookmark status for the property.
    const checkBookmarkStatus = async () => {
      try {
        const res = await fetch("/api/bookmarks/check", {
          // Sending a POST request to check bookmark status.
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            propertyId: property._id,
          }),
        });

        if (res.status === 200) {
          // If request is successful...
          const data = await res.json(); // Extracting data from response.
          setIsBookmarked(data.isBookmarked); // Setting bookmark status based on response data.
        }
      } catch (error) {
        // Handling errors if any occur during the process.
        console.log(error);
      } finally {
        setLoading(false); // Setting loading state to false after completion.
      }
    };

    checkBookmarkStatus(); // Invoking the function to check bookmark status.
  }, [property._id, userId]); // Dependency array to trigger effect when property id or user id changes.

  // Function to handle bookmark button click.
  const handleClick = async () => {
    if (!userId) {
      // If user is not logged in, show an error toast and return.
      toast.error("You need to sign in to bookmark a property");
      return;
    }

    try {
      const res = await fetch("/api/bookmarks", {
        // Sending a POST request to bookmark or remove bookmark for the property.
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId: property._id,
        }),
      });

      if (res.status === 200) {
        // If request is successful...
        const data = await res.json(); // Extracting data from response.
        toast.success(data.message); // Showing a success toast notification with response message.
        setIsBookmarked(data.isBookmarked); // Updating bookmark status based on response data.
      }
    } catch (error) {
      // Handling errors if any occur during the process.
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
};
export default BookmarkButton;
