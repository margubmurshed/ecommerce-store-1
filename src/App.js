import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Main from './Components/Main';
import ThemeProvider from './MaterialTheme';
import Store from './Redux/Store';

const App = () => {
  return (
    <>
      <ThemeProvider>
        <Provider store={Store}>
          <Router>
            <Main />
          </Router>
        </Provider>
      </ThemeProvider>
    </>
  )
}

export default App
