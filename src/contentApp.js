import React, { Component } from "react";

export class Home extends Component {
  render() {
    // console.log(this.props.popular);
    // console.log("poster_path");
    // console.log(this.props.popular.poster_path);
    return (
      <div className="home">
        <div className="home-backdrop">
          <div className="home-backdrop-header">
            <h1>Welcome My Page</h1>
            <h2>Thoudsands of movies to discover. Explore now.</h2>
          </div>
          <form className="home-backdrop-search">
            <input type="text" placeholder="Search for movie..."></input>
            <button>Search</button>
          </form>
        </div>
        <div className="home-popular">
          <h2> Top 20 popular movies</h2>
          <div className="home-popular-display">
            {this.props.popular.map((e, i) => {
              let {
                // overview,
                // vote_count,
                // media_type,
                id,
                poster_path,
                // genre_ids,
                vote_average,
                // backdrop_path,
                title,
                // original_title,
                release_date,
              } = e;
              return (
                <div className="movieBanner" key={i}>
                  <img src={poster_path} alt={title} />
                  <div className="movieBanner-averRate"></div>
                  <h4>{title}</h4>
                  <h5>{release_date}</h5>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export class Collection extends Component {
  render() {
    return <div className="collection"></div>;
  }
}

export class FAQ extends Component {
  render() {
    return <div className="FAQ"></div>;
  }
}
