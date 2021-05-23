import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    fetch('/hello').then(res => res.json()).then(data => {
      console.log(data);
      setCurrentMessage(data.message);
    });
  }, []);

  return (
    <div className="App">
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

      <p>I have a message for you: "{currentMessage}".</p>
      </header>
    </div>
  );
}


class Domain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
}

class Domains extends React.Component {
  render() {
    return (
      <div className="verticalbuffer">
        <h3>Topics Here</h3>
        <div>Example</div>
        <div>Example</div>
        <div>Example</div>
      </div>
    )
  }
}

class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render () {
    return (
      <div id="background">
        <h1>Planner</h1>
        <div id="greeting">
          <h3>Hello, Rodney.</h3>
        </div>
        <Domains/>
      </div>
    );

  }

}
export default MyApp;
// export default App;