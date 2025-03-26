"use client"; // Ensure this runs on the client

import { useUpload } from "@/context/UploadContext";
import { logoutUser } from "@/lib/api";
import { useEffect } from "react";

const SessionWarning = () => {
  const { sessionId } = useUpload();

  useEffect(() => {
    const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
      const confirmReload = window.confirm(
        "If you reload, your session data will be lost. Do you want to continue?"
      );

      if (!confirmReload) {
        event.preventDefault();
        alert(`Deleting evrything ${confirmReload}`) 
        console.log(`Deleting evrything ${confirmReload}`);
        return (event.returnValue = ""); // Required for some browsers
      }

      // Ensure logout happens before the page unloads
      try {
       
        
        await logoutUser(sessionId);
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [sessionId]); // Add sessionId as a dependency

  return null; // This component doesn't render anything
};

export default SessionWarning;

// "use client"; // Ensures this runs on the client side

// import { useEffect } from "react";
// import { logoutUser } from "@/lib/api"; // Import logout function
// import { useUpload } from "@/context/UploadContext";

// const SessionWarning = () => {
//   const { sessionId } = useUpload(); // Get session ID from context

//   useEffect(() => {
//     const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
//       // Ask user for confirmation before leaving
//       const confirmLeave = window.confirm("Are you sure you want to leave? Your session data may be lost.");

//       if (!confirmLeave) {
//         event.preventDefault();
//         event.returnValue = ""; // Required for some browsers
//         return; // Stop navigation or reload
//       }

//       // If user confirms, log them out
//       await logoutUser(sessionId);
//       console.log("User session logged out.");
//     };

//     // Attach event listener
//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       // Cleanup event listener when component unmounts
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [sessionId]); // Depend on sessionId to ensure proper updates

//   return null; // No UI rendering needed
// };

// export default SessionWarning;

