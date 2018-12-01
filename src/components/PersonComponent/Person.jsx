import React, { Component } from 'react';
import '../styles/Person.css'

const person = {
    affiliation: 'Actor',
    name: 'Tom Hanks',
    movies: ['Forrest Gump', 'Cast Away', 'The Terminal'],
    bio: 'Who Is Tom Hanks? Born on July 9, 1956, in Concord, California, actor Tom Hanks began performing with the Great Lakes Shakespeare Festival in 1977, later moving to New York City. He starred in the television sitcom Bosom Buddies, but became far more known when he starred in the Ron Howard film Splash.',
    img: 'https://m.media-amazon.com/images/M/MV5BMTQ2MjMwNDA3Nl5BMl5BanBnXkFtZTcwMTA2NDY3NQ@@._V1_.jpg'
}
//temp data

class Person extends Component {
    constructor(props){
        super(props);
        this.state = {
            active: false,
        }
        this.togglePop = this.togglePop.bind(this);
    }
    render() {
        const { affiliation, name, movies, bio, img } = person; //from props
        const { active } = this.state;

        return (
            <div>
            <div className={'person-pop '+(active? 'person-pop-active' : '')}>
                <aside>PERSON <br/> REVIEW</aside>
                <div className="image-container">
                    <img src={img}
                    alt="Tom Hanks"/>
                </div>
                <div className="person-info">
                <div className="col1">
                        <div id="affiliation"><strong>AFFILIATION | </strong>{affiliation.toUpperCase()} ||</div>
                        <div id="name"><strong>NAME | </strong>{name.toUpperCase()} ||</div>
                        <div id="movies"><strong>MOVIES | </strong> 
                        {movies.map((movie,i) =>(i!==movies.length-1 ? `${movie.toUpperCase()} || ` : `${movie.toUpperCase()} `))} </div>
                    </div>
                    <div className="col2">
                        <div id="bio"><strong>BIO | </strong>{bio.toUpperCase()} 
                        </div>
                    </div>
                </div>
                <button id="close" onClick={this.togglePop} >+</button>
            </div>
                {!active? <button id="closed" onClick={this.togglePop}>+</button>: null}
            </div>
            );
        }
     togglePop(){
         this.setState({
             active: !this.state.active,
         })
     }
}
    

export default Person;