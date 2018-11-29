import React, { Component } from 'react';
import FilmCard from './components/FilmCard/FilmCard';
import getNytimesApi from './constants/nytimesApi';
import getOmdbApi from './constants/omdbApi';
import uniqId from './utils/uniqId';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      films: [],
      Title: [],
      Poster: [],
      Director: [],
      Actors: [],
      Year: [],
      Ratings: [],
      Description: [],
      isFetching: true,
      error: null
    };

    // this.api = getOmdbApi(this.props);
    this.NytimesApi = getNytimesApi(60);
  }
  getFilmTitles = () => {
    const { films } = this.state;
    fetch(this.NytimesApi)
      .then(response => response.json())

      .then(response => {
        const filmNames = [];

        response.results.forEach(element => {
          filmNames.push(element.display_title);
        });
        this.setState({ films: filmNames });
        console.log(filmNames);
      });
  };

  componentDidMount() {
    this.getFilmTitles();
    // this.getTitle();
    // this.getPoster();
    // this.getDirector();
    // this.getActors();
    // this.getYear();
    // this.getRatings();
    // this.getDescription();
  }

  render() {
    const { films } = this.state;
    return (
      <div className="App">
        <ul>
          {films.map(film => (
            <li key={uniqId()}>
              <FilmCard Title={film} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
