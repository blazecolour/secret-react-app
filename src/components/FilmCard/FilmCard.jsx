import React from 'react';
import getOmdbApi from '../../constants/omdbApi';
import './FilmCard.css';

const api = getOmdbApi('alien');

export default class FilmCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Title: '',
      Poster: '',
      Director: '',
      Actors: '',
      Year: '',
      Ratings: '',
      Description: '',
      isFetching: true,
      error: null
    };
  }

  getTitle = () => {
    const { Title } = this.state;
    fetch(api)
      .then(response => response.json())
      .then(result =>
        this.setState({ Title: result.Title, isFetching: false })
      );
  };

  getPoster = () => {
    const { Poster } = this.state;
    fetch(api)
      .then(response => response.json())
      .then(result =>
        this.setState({ Poster: result.Poster, isFetching: false })
      );
  };

  getDirector = () => {
    const { Director } = this.state;
    fetch(api)
      .then(response => response.json())
      .then(result =>
        this.setState({ Director: result.Director, isFetching: false })
      );
  };

  getActors = () => {
    const { Actors } = this.state;
    fetch(api)
      .then(response => response.json())
      .then(result =>
        this.setState({ Actors: result.Actors, isFetching: false })
      );
  };

  getYear = () => {
    const { Year } = this.state;
    fetch(api)
      .then(response => response.json())
      .then(result => this.setState({ Year: result.Year, isFetching: false }));
  };

  getRatings = () => {
    const { Ratings } = this.state;
    fetch(api)
      .then(response => response.json())
      .then(result =>
        this.setState({ Ratings: result.Ratings[0].Value, isFetching: false })
      );
  };

  getDescription = () => {
    const { Description } = this.state;
    fetch(api)
      .then(response => response.json())
      .then(result =>
        this.setState({ Description: result.Plot, isFetching: false })
      );
  };

  componentDidMount() {
    this.getTitle();
    this.getPoster();
    this.getDirector();
    this.getActors();
    this.getYear();
    this.getRatings();
    this.getDescription();
  }

  render() {
    const {
      Title,
      Poster,
      Director,
      Actors,
      Year,
      Description,
      Ratings,
      isFetching
    } = this.state;
    if (isFetching) return <div>...Loading</div>;

    return (
      <div className="film-card">
        <img src={Poster} alt="poster" />
        <div className="info-card">
          <h2>{Title}</h2>
          <p>Director: {Director}</p>
          <p>Actors: {Actors}</p>
          <p>Year: {Year}</p>
          <p>Rating: {Ratings}</p>
          <p>Description: {Description}</p>
          <p>Review: </p>
        </div>
      </div>
    );
  }
}
