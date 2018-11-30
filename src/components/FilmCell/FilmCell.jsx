import React from 'react';
import getOmdbApi from '../../constants/omdbApi';
import uniqId from '../../utils/uniqId';
import { normalizeRating, getRatingStar } from '../../utils/getRatingStar';
import getPoster from '../../utils/placeholderImg';
import './FilmCell.css';

export default class FilmCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Poster: '',
      Director: '',
      Actors: [],
      Year: '',
      Ratings: '',
      error: null
    };

    this.api = getOmdbApi(this.props.Title);
  }

  getData = () => {
    fetch(this.api)
      .then(response => response.json())
      .then(data =>
        this.setState({
          Poster: data.Poster,
          Director: data.Director,
          Actors: data.Actors.split(',').slice(0, 3),
          Year: data.Year,
          Ratings: data.imdbRating,
          Description: data.Plot
        })
      );
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const { Title } = this.props;

    const { Poster, Director, Actors, Year, Ratings } = this.state;
    const ratingStars = getRatingStar(normalizeRating(Ratings));
    const poster = getPoster(Poster);
    return (
      <div className="film-card">
        
          <img src={poster} alt="poster"  width="150" height="222"/>
      
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
        </div>
      </div>
    );
  }
}
