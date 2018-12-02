import React from 'react';
import PropTypes from 'prop-types';
import { getOmdbApi } from '../../utils/fetchApi';
import uniqId from '../../utils/uniqId';
import getRatingStar from '../../utils/getRatingStar';
import getPoster from '../../utils/placeholderImg';
import normalize from '../../utils/normalize';
import './FilmItem.css';

export default class FilmItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      poster: '',
      director: '',
      actors: '',
      year: '',
      rating: '',
      error: null
    };

    this.api = getOmdbApi(this.props.title);
  }

  getData() {
    fetch(this.api)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => {
        const poster = getPoster(data.Poster);
        const director = normalize(data.Director);
        const year = normalize(data.Year);
        const rating = getRatingStar(data.imdbRating);
        this.setState({
          poster: poster,
          director: director,
          actors: data.Actors,
          year: year,
          rating: rating
        });
      })
      .catch(error => this.setState({ error }));
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const { title } = this.props;
    const { poster, director, actors, year, rating, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    function renderActors() {
      if (!actors || actors === 'N/A') return ' no actors';
      return actors
        .split(',')
        .slice(0, 3)
        .map(actor => <div key={uniqId()}>{actor}</div>);
    }

    return (
      <div className="film-card">
        <img src={poster} alt="poster" width="75" height="111" />
        <h2>{title}</h2>
        <p>Director: {director}</p>
        <div className="actor-list">Actors: {renderActors()}</div>
        <p>Year: {year}</p>
        <p>Rating: {rating}</p>
      </div>
    );
  }
}

FilmItem.propTypes = {
  title: PropTypes.string.isRequired
};
