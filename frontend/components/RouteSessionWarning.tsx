'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const RouteSessionWarning = ({ shouldConfirm = false }: { shouldConfirm?: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  useEffect(() => {
    // Function to handle beforeunload event (browser tab/window close)
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (shouldConfirm) {
        e.preventDefault();
        e.returnValue = ''; // Required for Chrome
      }
    };

    // Add beforeunload event listener
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Check if pathname has changed
    if (shouldConfirm && pathname !== lastPathname) {
      const confirmLeave = window.confirm(
        'Are you sure you want to leave this page? Unsaved changes may be lost.'
      );

      if (!confirmLeave) {
        // Attempt to navigate back to the previous page
        router.push(lastPathname);
      } else {
        // Update last pathname if user confirms leaving
        setLastPathname(pathname);
      }
    }

    // Cleanup event listener
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [shouldConfirm, pathname, lastPathname, router]);

  return null; // This component doesn't render anything
};

export default RouteSessionWarning;