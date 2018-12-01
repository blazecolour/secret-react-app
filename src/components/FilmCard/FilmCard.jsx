import React from 'react';
import { getOmdbApi } from '../../utils/fetchApi';
import uniqId from '../../utils/uniqId';
import getRatingStar from '../../utils/getRatingStar';
import getPoster from '../../utils/placeholderImg';
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

  getData = () => {
    fetch(this.api)
      .then(response => response.json())
      .then(data => {
        this.setState({
          poster: data.Poster,
          director: data.Director,
          actors: data.Actors.split(',').slice(0, 3),
          year: data.Year,
          rating: data.imdbRating,
          description: data.Plot
        });
      });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const { title, review } = this.props;

    const { poster, director, actors, year, rating, description } = this.state;
    const ratingStars = getRatingStar(rating);
    const posterFilm = getPoster(poster);
    function renderActors() {
      if (!actors || actors === 'N/A') return ' no actors';
      return actors.split(',').slice(0, 3).map(actor => (
       <div key={uniqId()}>{actor}</div>
     ))}
    return (
      <div className="film-card">
        <div>
          <img src={posterFilm} alt="poster" />
        </div>
        <div className="info-card">
          <h2>{title}</h2>
          <p>Director: {director}</p>
          <div>
            Actors:
            {renderActors()}
          </div>
          <p>Year: {year}</p>
          <p>Rating: {ratingStars}</p>
          <p className="description-film">Description: {description}</p>
          <p className="description-film">Review: {review}</p>
        </div>
      </div>
    );
  }
}
