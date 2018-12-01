import React, { Component } from 'react';
// import FilmCard from './components/FilmCard/FilmCard';
// import FilmCell from './components/FilmCell/FilmCell';
import FilmItem from './components/FilmItem/FilmItem';
import Loading from './components/Loading/Loading';
import { getNytimesApi } from './utils/fetchApi';
import uniqId from './utils/uniqId';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      titles: [],
      reviews: [],
      isFetching: true,
      error: null
    };

    this.api = getNytimesApi(20);
  }

  getFilmTitles = () => {
    fetch(this.api)
      .then(response => response.json())
      .then(data => {
        const filmNames = data.results.map(({ display_title }) => display_title);
        const filmReviews = data.results.map(({ summary_short }) => summary_short);

        this.setState({
          titles: filmNames,
          reviews: filmReviews,
          isFetching: false
        });
      });
  };

  componentDidMount() {
    this.getFilmTitles();
  }

  render() {
    const { titles, isFetching } = this.state;

    if (isFetching) return <Loading width="100px" height="100px" />;

    return (
      <div className="App">
        {titles.map((title, id) => (
          <div key={uniqId()}>
            {/* <FilmCard title={title} review={reviews[id]} /> */}
            {/* <FilmCell title={title} /> */}
            <FilmItem title={title} />
          </div>
        ))}
      </div>
    );
  }
}

export default App;
