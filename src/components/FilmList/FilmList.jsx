import React, { Component } from 'react';
import FilmCell from '../FilmCell/FilmCell';
import Loading from '../Loading/Loading';
import { getNytimesApi } from '../../utils/fetchApi';
import uniqId from '../../utils/uniqId';
import uniqOffset from '../../utils/uniqOffset';
import './FilmList.css';

export default class FilmList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      titles: [],
      reviews: [],
      isFetching: false,
      error: null
    };

    this.api = getNytimesApi(uniqOffset());
  }

  getFilmTitles() {
    fetch(this.api)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => {
        const filmNames = data.results.map(
          ({ display_title }) => display_title
        );
        const filmReviews = data.results.map(
          ({ summary_short }) => summary_short
        );
        this.setState({
          titles: filmNames,
          reviews: filmReviews,
          isFetching: false
        });
        console.log(uniqOffset());
      })
      .catch(error => this.setState({ error }));
  }

  componentDidMount() {
    this.setState({ isFetching: true });
    this.getFilmTitles();
  }

  render() {
    const { titles, isFetching, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isFetching) {
      return <Loading width="100px" height="100px" />;
    }

    return (
      <div className="Film-list">
        {titles.map(title => (
          <div key={uniqId()}>
            <FilmCell title={title} />
          </div>
        ))}
      </div>
    );
  }
}
