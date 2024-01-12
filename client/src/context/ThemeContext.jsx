import React, { createContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [mode, setMode] = useState('dark');
  const [paleta, setPaleta] = useState({});

  const storage = {
    light: {
      background: 'bg-light-back',
      primary: 'bg-light-primary',
      secondary: 'bg-light-secondary',
      color: 'bg-light-color',
      text: 'text-light-text'
    },
    dark: {
      background: 'bg-dark-back',
      primary: 'bg-dark-primary',
      third: 'bg-dark-third',
      secondary: 'bg-dark-secondary',
      color: 'bg-dark-color',
      text: 'text-dark-text'
    }
  }


  useEffect(() => {
    if (mode === 'light') {
      setPaleta(storage.light);
    } else {
      setPaleta(storage.dark);
    }
}, [mode]) // eslint-disable-line react-hooks/exhaustive-deps




  return (
    <ThemeContext.Provider value={{ mode, setMode, paleta }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider};