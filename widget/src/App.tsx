import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { Provider } from 'react-redux';

import store from './store';
import mainTheme from './themes/mainTheme';
import MainPage from 'pages/main';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <MainPage />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
