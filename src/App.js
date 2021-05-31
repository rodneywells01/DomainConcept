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
    console.log("I just got constructed!")
    console.log(props)
  }

  render() {
    return (
      <div className="domain-card">
        <div>{this.props.mydomain.name}</div>
        <img src={this.props.mydomain.photo_url} />
      
      </div>
    )
  }
}

class DomainCategory extends React.Component {
  constructor(props) {
    super(props);
    console.log("Creating category for " + this.props.category);
    console.log(props)
  }

  render() {
    const domains = this.props.domains.map((domain) => {
      return <Domain key={domain.name} mydomain={domain} />
    })
    return (
      <div className="domain-category">
        <div>{this.props.category}</div>
        <div>{domains}</div>
      </div>
    )
  }
}

class Domains extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      domains: [],
      domains_by_category: {}
    }

    // Get the domains! 
    console.log("Sending an API call to get the domains.")
    // fetch('/domain').then(res => res.json()).then(data => {
    //   console.log("Got the domains")
    //   console.log(data);
    //   this.setState({
    //     domains: data.domains
    //   })
    // });

    fetch('/domain/categories').then(res => res.json()).then(data => {
      console.log("Got the domains!")
      console.log(data);
      this.setState({
        domains_by_category: data.domains_by_category
      });
    });

  }
  render() {

    // someList.map((item) => {
    //   ...
    // })
    const categories = Object.keys(this.state.domains_by_category).map((category) => {
      console.log(this.state.domains_by_category);
      var domains = this.state.domains_by_category[category];
      return (
          <DomainCategory key={category} category={category} domains={domains} />
      )
    });
    console.log("In Render!")
    // console.log(domains)
    // console.log(this.state.domains)
    return (
      <div className="verticalbuffer">
        {categories}
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
          <h3>Hello, Rodney!</h3>
        </div>
        <Domains/>
      </div>
    );

  }

}
export default MyApp;
// export default App;