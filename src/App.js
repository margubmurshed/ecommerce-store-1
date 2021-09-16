import Main from './Components/Main';
import { Provider } from 'react-redux';
import Store from './Redux/Store';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './MaterialTheme';
import './App.css';

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
