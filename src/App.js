import React, { Component } from 'react';
import './App.css';

class App extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      term: '', //to store current value which we passing to input
      img: [] //to store url which late we will passing to <img src={url}/>
    }
  }
  onChange = (event) =>{
    this.setState({
      term: event.target.value
    })
  }

  handleSubmit = (event) =>{
    event.preventDefault();


    const api_key = 'iWBUKZ9FKnn0TpzMnKnbavETePZ8KKU1';
    const url = `http://api.giphy.com/v1/gifs/search?q=${this.state.term}&api_key=${api_key}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {this.setState({term: '', img: data.data});})
      .catch(e => console.log('error', e));

  }

  render() {
    return (
      <div className="App">
        <h1>
          Procure um GIF
        </h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.term} onChange={this.onChange}/>
          <button>search</button>
        </form>

        <ul>{
          this.state.img.map((item) => {
            return(
              <li key={item.id}>
                  <a href={item.url} target="_blank">
                    <img src={item.images.fixed_width.url} height={item.images.fixed_width.height} width={item.images.fixed_width.width}/>
                    <figcaption>
                      {item.title}
                    </figcaption>
                  </a>
              </li>
            )
          })
        }
        </ul>
      </div>
    );
  }
}

export default App;
