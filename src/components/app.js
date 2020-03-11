import React, { Component } from 'react';

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      movieData: [],
      title: "",
      genre: "",
      rating: ""
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this. handleSubmit.bind(this)
  }

  componentDidMount() {
    fetch("http://127.0.0.1:5000/movies/get", { 
      method: "GET",
      headers: {
        "content-type": "application/json "
      }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    fetch("http://127.0.0.1:5000/movies/post", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        "title": this.state.title, 
        "genre": this.state.genre,
        "rating": this.state.rating
      }),
      
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error))
  }


  render() {
    return (
      <div className='app'>
        <form onSubmit={this.handleSubmit}>
            <input type="text"  name="title" value={this.state.title} onChange={this.handleChange} />
            <input type="text"  name="genre" value={this.state.genre} onChange={this.handleChange} />
            <input type="text"  name="rating" value={this.state.rating} onChange={this.handleChange} />
            <button type="submit">Add Movie</button>
        </form>
      </div>
    );
  }
}