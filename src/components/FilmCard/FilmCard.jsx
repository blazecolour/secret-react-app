import React from 'react';
import getOmdbApi from '../../constants/omdbApi';
import uniqId from '../../utils/uniqId';
import { normalizeRating, getRatingStar } from '../../utils/getRatingStar';
import getPoster from '../../utils/placeholderImg';
import './FilmCard.css';

export default class FilmCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Poster: '',
      Director: '',
      Actors: [],
      Year: '',
      Ratings: '',
      Description: '',
      error: null
    };

    this.api = getOmdbApi(this.props.Title);
  }

  getPoster = () => {
    fetch(this.api)
      .then(response => response.json())
      .then(result => this.setState({ Poster: result.Poster }));
  };

  getDirector = () => {
    fetch(this.api)
      .then(response => response.json())
      .then(result => this.setState({ Director: result.Director }));
  };

  getActors = () => {
    fetch(this.api)
      .then(response => response.json())
      .then(result =>
        this.setState({ Actors: result.Actors.split(',').slice(0, 3) })
      );
  };

  getYear = () => {
    fetch(this.api)
      .then(response => response.json())
      .then(result => this.setState({ Year: result.Year }));
  };

  getRatings = () => {
    fetch(this.api)
      .then(response => response.json())
      .then(result => this.setState({ Ratings: result.imdbRating }));
  };

  getDescription = () => {
    fetch(this.api)
      .then(response => response.json())
      .then(result => this.setState({ Description: result.Plot }));
  };

  componentDidMount() {
    this.getPoster();
    this.getDirector();
    this.getActors();
    this.getYear();
    this.getRatings();
    this.getDescription();
  }

  render() {
    const { Title, review } = this.props;

    const { Poster, Director, Actors, Year, Description, Ratings } = this.state;
    const ratingStars = getRatingStar(normalizeRating(Ratings));
    const poster = getPoster(Poster);
    return (
      <div className="film-card">
        <img src={poster} alt="poster" />
        <div className="info-card">
          <h2>{Title}</h2>
          <p>Director: {Director}</p>
          <div>
            Actors:
            {Actors.map(actor => (
              <div key={uniqId()}>{actor}</div>
            ))}
          </div>
          <p>Year: {Year}</p>
          <p>Rating: {ratingStars}</p>
          <p className="description-film">Description: {Description}</p>
          <p className="description-film">Review: {review}</p>
        </div>
      </div>
    );
  }
}
