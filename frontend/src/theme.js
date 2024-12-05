export const colorTokens = {
    grey: {
      0: "#FFFFFF",
      10: "#F6F6F6",
      50: "#F0F0F0",
      100: "#E0E0E0",
      200: "#C2C2C2",
      300: "#A3A3A3",
      400: "#858585",
      500: "#666666",
      600: "#4D4D4D",
      700: "#383f57",
      800: "#383f57",
      900: "#212021",
      1000: "#000000",
    },
    primary: {
      50: "#a4c0f8",
      100: "#7ca7f7",
      200: "#649af7",
      300: "#488bf7",
      400: "#277af7",
      500: "#0067f7",
      600: "#0255d1",
      700: "#0346b2",
      800: "#043995",
      900: "#05307e",
    },
  };
  
  export const themeSettings = () => ({
    palette: {
      mode: 'dark',
      primary: {
        main: '#00ffcc', 
      },
      secondary: {
        main: '#ff4081', 
      },
      background: {
        default: '#171717',
        paper: '#1b1b1b',
      },
      text: {
        primary: '#ffffff',
        secondary: '#bdbdbd',
      },
    },
    typography: {
      fontFamily: "'GothamRounded', Arial, sans-serif",
      h1: { fontSize: '2rem', fontWeight: 'bold', color: '#ffffff' },
      body1: { fontSize: '1rem', color: '#bdbdbd' },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '30px',
            textTransform: 'none',
            padding: '10px 20px',
            background: 'linear-gradient(45deg, #e00069, orange)',
            '&:hover': {
              background: 'linear-gradient(45deg, orange, #e00069)',
            },
          },
        },
      },
    },
  });
  