import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from 'react';

type ColorModeContextType = {
  mode: string;
  setMode: () => void;
};

export const ColorModeContext = createContext<ColorModeContextType>(
  {} as ColorModeContextType
);

export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const colorModeFromLocalStorage = localStorage.getItem('colorMode');
  const isSystemPreferenceDark = window?.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  const systemPreference = isSystemPreferenceDark ? 'dark' : 'light';
  const [mode, setMode] = useState(
    colorModeFromLocalStorage || systemPreference
  );

  const typography = {
    fontFamily: ['Manrope', 'sans-serif'].join(','),
    body1: {
      lineHeight: 1,
    },
  };

  const darkTheme = responsiveFontSizes(
    createTheme({
      palette: {
        primary: {
          main: '#1E88E5',
        },
        secondary: {
          main: '#9c27b0',
        },
        mode: 'dark',
      },
      typography,
    })
  );

  const lightTheme = responsiveFontSizes(
    createTheme({
      palette: {
        primary: {
          main: '#1E88E5',
        },
        secondary: {
          main: '#9c27b0',
        },
      },
      typography,
    })
  );

  useEffect(() => {
    window.localStorage.setItem('colorMode', mode);
  }, [mode]);

  const setColorMode = () => {
    if (mode === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  return (
    <ColorModeContext.Provider
      value={{
        setMode: setColorMode,
        mode,
      }}
    >
      <ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
