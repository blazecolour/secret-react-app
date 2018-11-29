import React from 'react';
import getOmdbApi from '../../constants/omdbApi';
import './FilmCard.css';

export default class FilmCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Poster: '',
      Director: '',
      Actors: '',
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
      .then(result => this.setState({ Actors: result.Actors }));
  };

  getYear = () => {
    fetch(this.api)
      .then(response => response.json())
      .then(result => this.setState({ Year: result.Year }));
  };

  getRatings = () => {
    fetch(this.api)
      .then(response => response.json())
      .then(result => this.setState({ Ratings: result.Ratings[0].Value }));
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
    // this.getRatings();
    this.getDescription();
  }

  render() {
    const { Title } = this.props;

    const {
      Poster,
      Director,
      Actors,
      Year,
      Description
      // Ratings,
    } = this.state;

    return (
      <div className="film-card">
        <img src={Poster} alt="poster" />
        <div className="info-card">
          <h2>{Title}</h2>
          <p>Director: {Director}</p>
          <p>Actors: {Actors}</p>
          <p>Year: {Year}</p>
          {/* <p>Rating: {Ratings}</p> */}
          <p className="description-film">Description: {Description}</p>
          <p>Review: </p>
        </div>
      </div>
    );
  }
}
