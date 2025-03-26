"use client";

import { useEffect } from 'react';
import { useUpload } from '@/context/UploadContext';
import { logoutUser } from '@/lib/api';
import { toast } from 'react-toastify';

const usePageUnloadHandler = () => {
  const { sessionId } = useUpload();

  useEffect(() => {
    // Handler for page reload or tab close
    const handleBeforeUnload = async (e: BeforeUnloadEvent) => {
      // Only show confirmation if there are notes or tables
      if (sessionId) {
        e.preventDefault(); // Standard way to show browser's default confirmation
        e.returnValue = ''; // Required for some browsers

        const shouldLeave = window.confirm('Are you sure you want to leave? Your notes will be lost.');
        
        if (shouldLeave && sessionId) {
          try {
            await logoutUser(sessionId);
          } catch (error) {
            toast.error('Error during page leave');
          }
        }
      }
    };

    // Add event listener for page reload/close
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup event listener
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [sessionId]);
};

export default usePageUnloadHandler;