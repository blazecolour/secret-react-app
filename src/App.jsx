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
      review: [],
      isFetching: true,
      error: null
    };

    this.NytimesApi = getNytimesApi(20);
  }
  getFilmTitles = () => {
    fetch(this.NytimesApi)
      .then(response => response.json())

      .then(response => {
        const filmNames = [];
        const review = [];

        response.results.forEach(element => {
          filmNames.push(element.display_title);
          review.push(element.summary_short);
        });
        this.setState({ films: filmNames, review: review, isFetching: false });
      });
  };

  componentDidMount() {
    this.getFilmTitles();
  }

  render() {
    const { films, review, isFetching } = this.state;

    if (isFetching) return <Loading width="100px" height="100px" />;

    return (
      <div className="App">
        <ul>
        
          {films.map((film, id) => (
            <li key={uniqId()}>
              <FilmCard Title={film} review={review[id]} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
