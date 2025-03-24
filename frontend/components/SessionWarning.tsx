"use client"; // Ensure this runs on the client

import { useEffect } from "react";

const SessionWarning = () => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const confirmReload = window.confirm("If you reload, your session data will be lost. Do you want to continue?");
      if (!confirmReload) {
        event.preventDefault();
        return (event.returnValue = ""); // Some browsers require this
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return null; // This component doesn't render anything
}

export default SessionWarning