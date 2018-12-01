import React, { Component } from 'react';
import FilmList from '../FilmList/FilmList';
import uniqId from '../../utils/uniqId';
import './FilmLayout.css';

class FilmLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      films: []
    };
  }

  onChangeFilms = e => {
    e.preventDefault();
    const { films } = this.state;
    const newFilms = <FilmList />;
    this.setState({ films: [newFilms, ...films] });
  };

  render() {
    const { films } = this.state;
    return (
      <div>
        <FilmList />
        {films.map(list => (
          <div key={uniqId()}>{list}</div>
        ))}
        <button className="btn" onClick={this.onChangeFilms}>more</button>
      </div>
    );
  }
}

export default FilmLayout;
