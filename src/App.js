import React from 'react';
import './App.css';

const apiUrl = process.env.API_URL;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      url: '',
      title: '',
      src: ''
    }
  }

  handleInput = (event) => {
    this.setState({ url: event.target.value });
  }

  checkLink = () => {
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: this.state.url })
    })
      .then(res => res.json())
      .then(items => this.setState({
        src: items.url,
        title: items.title
      }));
  }
  
  render() {
    const { src, title } = this.state;
    return (
      <div className="container">
        <h1 className="header">Link Checker</h1>
        <div className="input-group">
          <input className="url-input" type="text" onChange={this.handleInput} />
          <input className="button" type="button" value="Check" onClick={this.checkLink} />
        </div>
        <div className="result">
          <img className="image" src={src} alt={title} />
          <div className="title">{title}</div>
        </div>
      </div>
    );
  }
}

export default App;
