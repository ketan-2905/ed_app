"use client"
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the context
interface PanicNotesContextType {
  notes: string | null;
  setNotes: (notes: string | null) => void;
  tables: string | null;
  setTables: (tables: string | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  downloadReady: boolean;
  setDownloadReady: (ready: boolean) => void;
  resetContext: () => void; // Added method to reset the entire context
}

// Create the context
const PanicNotesContext = createContext<PanicNotesContextType | undefined>(undefined);

// Provider component
export const PanicNotesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<string | null>(null);
  const [tables, setTables] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [downloadReady, setDownloadReady] = useState<boolean>(false);

  // Method to reset the entire context to its initial state
  const resetContext = () => {
    setNotes(null);
    setTables(null);
    setLoading(true);
    setDownloadReady(false);
  };

  return (
    <PanicNotesContext.Provider 
      value={{ 
        notes, 
        setNotes, 
        tables, 
        setTables, 
        loading, 
        setLoading,
        downloadReady,
        setDownloadReady,
        resetContext
      }}
    >
      {children}
    </PanicNotesContext.Provider>
  );
};

// Custom hook to use the PanicNotes context
export const usePanicNotes = () => {
  const context = useContext(PanicNotesContext);
  if (context === undefined) {
    throw new Error('usePanicNotes must be used within a PanicNotesProvider');
  }
  return context;
};