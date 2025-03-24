"use client";

import { createContext, useContext, useState } from "react";

interface FileData {
  id: string; // Added ID as per API response
  name: string;
  extension: string;
}

interface UploadContextType {
  uploadedFiles: FileData[];
  sessionId: string;
  setUploadData: (files: FileData[], sessionId: string) => void;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export const UploadProvider = ({ children }: { children: React.ReactNode }) => {
  const [uploadedFiles, setUploadedFiles] = useState<FileData[]>([]);
  const [sessionId, setSessionId] = useState<string>("");

  const setUploadData = (newFiles: FileData[], newSessionId: string) => {
    setUploadedFiles(() => [...newFiles]); // Append new files
    setSessionId(newSessionId);
    console.log(newFiles, "\n", newSessionId);
  };

  return (
    <UploadContext.Provider value={{ uploadedFiles, sessionId, setUploadData }}>
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUpload must be used within an UploadProvider");
  }
  return context;
};
