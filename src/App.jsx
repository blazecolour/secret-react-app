import React, { Component } from 'react';
import FilmCard from './components/FilmCard/FilmCard';
import Loading from './components/Loading/Loading';
import getNytimesApi from './constants/nytimesApi';
import uniqId from './utils/uniqId';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      films: [],
      isFetching: true,
      error: null
    };

    this.NytimesApi = getNytimesApi(120);
  }
  getFilmTitles = () => {
    fetch(this.NytimesApi)
      .then(response => response.json())

      .then(response => {
        const filmNames = [];

        response.results.forEach(element => {
          filmNames.push(element.display_title);
        });
        this.setState({ films: filmNames, isFetching: false });
      });
  };

  componentDidMount() {
    this.getFilmTitles();
  }

  render() {
    const { films, isFetching } = this.state;

    if (isFetching) return <Loading width='10px' height='10px' />;

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
