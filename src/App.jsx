import React, { Component } from 'react';
import FilmCard from './components/FilmCard/FilmCard';
// import FilmCell from './components/FilmCell/FilmCell';
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
        this.setState({
          films: filmNames,
          review: review,
          isFetching: false
        });
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
        {films.map((film, id) => (
          <div key={uniqId()}>
            <FilmCard title={film} review={review[id]} />
          </div>
        ))}
      </div>
    );
  }
}

export default App;
