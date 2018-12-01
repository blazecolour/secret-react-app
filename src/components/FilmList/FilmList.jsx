import React, { Component } from 'react';
import FilmCell from '../FilmCell/FilmCell';
import Loading from '../Loading/Loading';
import { getNytimesApi } from '../../utils/fetchApi';
import uniqId from '../../utils/uniqId';
import uniqOffset from '../../utils/uniqOffset';
import './FilmList.css';

class FilmList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      titles: [],
      reviews: [],
      isFetching: true,
      error: null
    };

    this.api = getNytimesApi(uniqOffset());
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
            <FilmCell title={title} />
          </div>
        ))}
      </div>
    );
  }
}

export default FilmList;
