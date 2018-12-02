import React from 'react';
import PropTypes from 'prop-types';
import { getOmdbApi } from '../../utils/fetchApi';
import uniqId from '../../utils/uniqId';
import getRatingStar from '../../utils/getRatingStar';
import getPoster from '../../utils/placeholderImg';
import normalize from '../../utils/normalize';
import './FilmCard.css';

export default class FilmCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      poster: '',
      director: '',
      actors: '',
      year: '',
      rating: '',
      description: '',
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
        const description = normalize(data.Plot);
        this.setState({
          poster: poster,
          director: director,
          actors: data.Actors,
          year: year,
          rating: rating,
          description: description
        });
      })
      .catch(error => this.setState({ error }));
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const { title, review } = this.props;
    const { poster, director, actors, year, rating, description, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    function renderActors() {
      if (!actors || actors === 'N/A') return ' no information';
      return actors
        .split(',')
        .slice(0, 3)
        .map(actor => <div key={uniqId()}>{actor}</div>);
    }
    return (
      <div className="film-card">
        <div>
          <img src={poster} alt="poster" />
        </div>
        <div className="info-card">
          <h2>{title}</h2>
          <p>Director: {director}</p>
          <div>Actors: {renderActors()}</div>
          <p>Year: {year}</p>
          <p>Rating: {rating}</p>
          <p className="description-film">Description: {description}</p>
          <p className="description-film">Review: {review}</p>
        </div>
      </div>
    );
  }
}

FilmCard.propTypes = {
  title: PropTypes.string.isRequired,
  review: PropTypes.string
};
