import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CircleProcessBar } from "./lib/tool/tool";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trendingDay: false,
    };
  }
  handleToggleTrendind = (x) => {
    this.setState({ trendingDay: x });
  };
  render() {
    // console.log(this.props.popular);
    // console.log("poster_path");
    // console.log(this.props.trending);
    let { trendingDay } = this.state;
    let trending = [];
    trendingDay
      ? (trending = this.props.trending.week)
      : (trending = this.props.trending.day);
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
              let { id, poster_path, vote_average, title, release_date } = e;
              let part_link = id + "-" + title.replace(/\s/g, "-");
              // console.log(part_link);
              return (
                <div className="movieBanner" key={i}>
                  <Link
                    to={"/movie/" + part_link}
                    key={i}
                    className="link-decoration"
                  >
                    <img src={poster_path} alt={title} />
                    <div className="movieBanner-averRate"></div>
                    <div className="movieBanner-title">
                      <h4>{title}</h4>
                      <h5>{release_date}</h5>
                    </div>
                    <div className="wrap-circleProcessBar">
                      <CircleProcessBar percent={vote_average * 10} />
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <div className="home-trending">
          <div className="home-popular">
            <div className="home-popular-header">
              <h2> Top 20 trending movies</h2>
              <div className="home-popular-header-toggle">
                <div
                  className="bythetime"
                  onClick={() => this.handleToggleTrendind(false)}
                  style={trendingDay ? { color: "black" } : { color: "white" }}
                >
                  Today
                </div>
                <div
                  className="bythetime"
                  onClick={() => this.handleToggleTrendind(true)}
                  style={trendingDay ? { color: "white" } : { color: "black" }}
                >
                  This Week
                </div>
                <div
                  className="cover"
                  style={
                    trendingDay
                      ? { left: "82px", width: "112px" }
                      : { left: 0, width: "82px" }
                  }
                ></div>
              </div>
            </div>
            <div className="home-popular-display">
              {trending.map((e, i) => {
                let { id, poster_path, vote_average, title, release_date } = e;
                let part_link = id + "-" + title.replace(/\s/g, "-");
                // console.log(part_link);
                return (
                  <div className="movieBanner" key={i}>
                    <Link
                      to={"/webFilmClub/movie/" + part_link}
                      key={i}
                      className="link-decoration"
                    >
                      <img src={poster_path} alt={title} />
                      <div className="movieBanner-averRate"></div>
                      <div className="movieBanner-title">
                        <h4>{title}</h4>
                        <h5>{release_date}</h5>
                      </div>
                      <div className="wrap-circleProcessBar">
                        <CircleProcessBar percent={vote_average * 10} />
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
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
