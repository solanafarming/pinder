import React from 'react';
import {Routes, Route} from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Home from './home.js';
//import Navbar from './common/Navbar';
//import Login from './screens/Login';

function App() {

  const theme = React.useMemo(() => createTheme(themeSettings()), []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
//export default withAITracking(reactPlugin, App);