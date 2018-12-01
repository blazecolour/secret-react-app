import React from 'react';
import { getOmdbApi } from '../../utils/fetchApi';
import uniqId from '../../utils/uniqId';
import getRatingStar from '../../utils/getRatingStar';
import getPoster from '../../utils/placeholderImg';
import './FilmItem.css';

export default class FilmItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      poster: '',
      director: '',
      actors: [],
      year: '',
      rating: '',
      error: null
    };

    this.api = getOmdbApi(this.props.title);
  }

  getData = () => {
    fetch(this.api)
      .then(response => response.json())
      .then(data =>
        this.setState({
          poster: data.Poster,
          director: data.Director,
          actors: data.Actors.split(',').slice(0, 3),
          year: data.Year,
          rating: data.imdbRating
        })
      );
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const { title } = this.props;

    const { poster, director, actors, year, rating } = this.state;
    const ratingStars = getRatingStar(rating);
    const posterFilm = getPoster(poster);
    return (
      <div className="film-card">
        <img src={posterFilm} alt="poster" width="75" height="111" />
        <h2>{title}</h2>
        <p>Director: {director}</p>
        <div className="actor-list">
          Actors:
          {actors.map(actor => (
            <div key={uniqId()}>{actor}</div>
          ))}
        </div>
        <p>Year: {year}</p>
        <p>Rating: {ratingStars}</p>
      </div>
    );
  }
}
