import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./Components/Home";
import {Signup} from "./Components/Signup";
function App() {
  return (
    <div className="App">
      <Signup/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React 
        </a>
        
      </header>
    </div>
  );
}

export default App;
