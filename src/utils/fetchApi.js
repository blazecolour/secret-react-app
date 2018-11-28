import getOmdbApi from '../constants/omdbApi';

const getTitle = name => {
  const { Title } = this.state;
  fetch(getOmdbApi(name))
    .then(response => response.json())
    .then(result => this.setState({ Title: result.Title, isFetching: false }));
};

const getPoster = name => {
  const { Poster } = this.state;
  fetch(getOmdbApi(name))
    .then(response => response.json())
    .then(result => this.setState({ Title: result.Poster, isFetching: false }));
};

const getDirector = name => {
  const { Director } = this.state;
  fetch(getOmdbApi(name))
    .then(response => response.json())
    .then(result =>
      this.setState({ Director: result.Director, isFetching: false })
    );
};

const getActors = name => {
  const { Actors } = this.state;
  fetch(getOmdbApi(name))
    .then(response => response.json())
    .then(result =>
      this.setState({ Actors: result.Actors, isFetching: false })
    );
};

const getYear = name => {
  const { Year } = this.state;
  fetch(getOmdbApi(name))
    .then(response => response.json())
    .then(result => this.setState({ Year: result.Year, isFetching: false }));
};

const getRatings = name => {
  const { Ratings } = this.state;
  fetch(getOmdbApi(name))
    .then(response => response.json())
    .then(result =>
      this.setState({ Ratings: result.Ratings[0].Value, isFetching: false })
    );
};

const getDescription = name => {
  const { Description } = this.state;
  fetch(getOmdbApi(name))
    .then(response => response.json())
    .then(result =>
      this.setState({ Description: result.Plot, isFetching: false })
    );
};

export {
  getTitle,
  getPoster,
  getDirector,
  getActors,
  getYear,
  getRatings,
  getDescription
};
