import { createContext, useContext, useState, ReactNode } from 'react';

type SnackbarContextType = {
  message: string;
  isOpen: boolean;
  showSnackbar: (message: string) => void;
  hideSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const showSnackbar = (message: string) => {
    setMessage(message);
    setIsOpen(true);
  };

  const hideSnackbar = () => {
    setIsOpen(false);
    setMessage('');
  };

  return (
    <SnackbarContext.Provider value={{ message, isOpen, showSnackbar, hideSnackbar }}>
      { children }
    </SnackbarContext.Provider>
  );
}

export function useSnackbar(): SnackbarContextType {{
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error('useSnackbar must be used within SnackbarProvider');
  }

  return context;
}}
