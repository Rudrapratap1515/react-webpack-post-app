import logo from './logo.svg';
import './App.css';
import MainPost from './Components/PostComponent';
import { ConfigureStore } from './redux/store';
import { Provider } from 'react-redux';

function App() {
  var store = ConfigureStore();
  return (
    <Provider store = {store}>
      <div className="App">
        <MainPost />
      </div>
    </Provider>
  );
}

export default App;
