import LoginUser from '../User/LoginUser/LoginUser';
import './App.scss';
import LoginAdmin from '../Admin/LoginAdmin/LoginAdmin';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <LoginAdmin/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <LoginUser/>
      </header>
    </div>
  );
}

export default App;
