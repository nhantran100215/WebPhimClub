import "./App.css";
import "./reset.css";
import React, { Component } from "react";
import ReactDOM from "react-dom";
// import * as colectionIDs from "./test.json";
// import ReactScrollWheelHandler from "react-scroll-wheel-handler";
/////////////////////////////////////////////////import icon
import Logo from "./../src/images/icon.png";
// import { FcFilmReel } from "react-icons/fc";
import { FiTrendingUp } from "react-icons/fi";
import {
  // AiFillCaretDown,
  // AiFillVideoCamera,
  AiOutlineSearch,
  AiOutlineClose,
} from "react-icons/ai";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
// import { BsCollectionPlayFill } from "react-icons/bs";
///////////////////////////////////////////////////import library function
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import film_collection from "./filmCollection.json";
import { Home, Collection, FAQ } from "./contentApp";

// D:\my work\web dev\javascript\reactjs\My_project\offline\WebPhimClub\public\icon_head.png
const kindOfLink = {
  collection: "Collection",
  movie: "movie",
  trending: "trending",
  popular: "popular",
  upcoming: "upcoming",
  toprated: "toprated",
  base_img_link: "https://image.tmdb.org/t/p/w500", //w500
};
export const concateString = (kind, id, time) => {
  const api_key = "d1ac13b85f1d54e58edbe4543ffee597";
  switch (kind) {
    case kindOfLink.collection:
      return ` https://api.themoviedb.org/3/collection/${id}?api_key=${api_key}&language=en-US`;
    // break;
    case kindOfLink.movie:
      return ` https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`;
    // break;
    case kindOfLink.trending:
      return `https://api.themoviedb.org/3/trending/all/${time}?api_key=${api_key}`;
    case kindOfLink.popular:
      return `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`;
    case kindOfLink.upcoming:
      return `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US&page=1`;
    case kindOfLink.toprated:
      return `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=1`;
    default:
      break;
  }
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: [],
      trending: {
        day: [],
        week: [],
      },
      popular: [],
      upcoming: [],
      nowplaying: [],
      toprated: [],
      search: [],
      genres: [],
      genre_ids: [],
    };
  }
  componentDidMount() {
    film_collection.forEach((e) => {
      // console.log(e.id);
      this.getAPIMovieArr(kindOfLink.collection, e.id);
    });
    this.getAPIMovieArr(kindOfLink.trending, undefined, "day");
    this.getAPIMovieArr(kindOfLink.trending, undefined, "week");
    this.getAPIMovieArr(kindOfLink.popular);
    this.getAPIMovieArr(kindOfLink.upcoming);
    this.getAPIMovieArr(kindOfLink.toprated);
  }

  getAPIMovieArr = async (kind, id, time) => {
    let url = concateString(kind, id, time);
    try {
      const response = await fetch(url);
      let datafet = await response.json();
      // console.log(datafet);
      switch (kind) {
        case kindOfLink.collection:
          let { movie } = this.state;
          for (let film of datafet.parts) {
            let {
              id,
              title,
              original_title,
              adult,
              release_date,
              poster_path,
              backdrop_path,
              overview,
              vote_average,
              vote_count,
              original_language,
            } = film;
            poster_path = kindOfLink.base_img_link + poster_path;
            backdrop_path = kindOfLink.base_img_link + backdrop_path;
            movie[movie.length] = {
              id,
              title,
              original_title,
              adult,
              release_date,
              poster_path,
              backdrop_path,
              overview,
              vote_average,
              vote_count,
              original_language,
            };
          }
          this.setState({ movie: movie });
          // console.log(this.state.movie);
          break;
        case kindOfLink.trending:
          // console.log(datafet.results);
          let trending1 = [];
          datafet.results.forEach((e) => {
            // console.log(e);
            let movie = {};
            let {
              overview,
              vote_count,
              media_type,
              id,
              poster_path,
              genre_ids,
              vote_average,
              backdrop_path,
            } = e;
            poster_path = kindOfLink.base_img_link + poster_path;
            backdrop_path = kindOfLink.base_img_link + backdrop_path;
            if (media_type === "tv") {
              let { name, original_name, first_air_date } = e;
              let title = name,
                original_title = original_name,
                release_date = first_air_date;
              movie = {
                overview,
                vote_count,
                media_type,
                id,
                poster_path,
                genre_ids,
                vote_average,
                backdrop_path,
                title,
                original_title,
                release_date,
              };
            }
            if (media_type === "movie") {
              let { title, original_title, release_date } = e;
              movie = {
                overview,
                vote_count,
                media_type,
                id,
                poster_path,
                genre_ids,
                vote_average,
                backdrop_path,
                title,
                original_title,
                release_date,
              };
            }
            trending1[trending1.length] = movie;
          });
          let { trending } = this.state;
          if (time === "day") trending.day = trending1;
          if (time === "week") trending.week = trending1;
          this.setState({ trending });
          // console.log(trending1);
          // console.log(this.state);
          // console.log(url);
          break;

        case kindOfLink.popular:
          // console.log(datafet);
          let popular1 = [];
          datafet.results.forEach((e) => {
            // console.log(e);
            let movie = {};
            let {
              overview,
              vote_count,
              media_type,
              id,
              poster_path,
              genre_ids,
              vote_average,
              backdrop_path,
            } = e;
            poster_path = kindOfLink.base_img_link + poster_path;
            backdrop_path = kindOfLink.base_img_link + backdrop_path;
            // console.log(
            //   overview,
            //   vote_count,
            //   media_type,
            //   id,
            //   poster_path,
            //   genre_ids,
            //   vote_average,
            //   backdrop_path
            // );
            if (media_type === "tv") {
              let { name, original_name, first_air_date } = e;
              let title = name,
                original_title = original_name,
                release_date = first_air_date;
              movie = {
                overview,
                vote_count,
                media_type,
                id,
                poster_path,
                genre_ids,
                vote_average,
                backdrop_path,
                title,
                original_title,
                release_date,
              };
              console.log(movie);
            }
            if (media_type === "movie") {
              let { title, original_title, release_date } = e;
              movie = {
                overview,
                vote_count,
                media_type,
                id,
                poster_path,
                genre_ids,
                vote_average,
                backdrop_path,
                title,
                original_title,
                release_date,
              };
            }
            if (media_type === undefined) {
              let { title, original_title, release_date } = e;
              movie = {
                overview,
                vote_count,
                media_type,
                id,
                poster_path,
                genre_ids,
                vote_average,
                backdrop_path,
                title,
                original_title,
                release_date,
              };
            }
            // console.log(movie);
            popular1[popular1.length] = movie;
          });
          // let { popular } = this.state;
          // if (time === "day") popular.day = popular1;
          // if (time === "week") popular.week = popular1;
          this.setState({ popular: popular1 });
          // console.log(this.state.popular);
          break;

        case kindOfLink.upcoming:
          // console.log(datafet);
          let upcoming1 = [];
          datafet.results.forEach((e) => {
            // console.log(e);
            let movie = {};
            let {
              overview,
              vote_count,
              media_type,
              id,
              poster_path,
              genre_ids,
              vote_average,
              backdrop_path,
            } = e;
            poster_path = kindOfLink.base_img_link + poster_path;
            backdrop_path = kindOfLink.base_img_link + backdrop_path;
            if (media_type === "tv") {
              let { name, original_name, first_air_date } = e;
              let title = name,
                original_title = original_name,
                release_date = first_air_date;
              movie = {
                overview,
                vote_count,
                media_type,
                id,
                poster_path,
                genre_ids,
                vote_average,
                backdrop_path,
                title,
                original_title,
                release_date,
              };
            }
            if (media_type === "movie") {
              let { title, original_title, release_date } = e;
              movie = {
                overview,
                vote_count,
                media_type,
                id,
                poster_path,
                genre_ids,
                vote_average,
                backdrop_path,
                title,
                original_title,
                release_date,
              };
            }
            if (media_type === undefined) {
              let { title, original_title, release_date } = e;
              movie = {
                overview,
                vote_count,
                media_type,
                id,
                poster_path,
                genre_ids,
                vote_average,
                backdrop_path,
                title,
                original_title,
                release_date,
              };
            }
            upcoming1[upcoming1.length] = movie;
          });
          // let { popular } = this.state;
          // if (time === "day") popular.day = popular1;
          // if (time === "week") popular.week = popular1;
          this.setState({ upcoming: upcoming1 });
          // console.log(this.state.upcoming);
          break;

        case kindOfLink.toprated:
          // console.log(datafet);
          let toprated1 = [];
          datafet.results.forEach((e) => {
            // console.log(e);
            let movie = {};
            let {
              overview,
              vote_count,
              media_type,
              id,
              poster_path,
              genre_ids,
              vote_average,
              backdrop_path,
            } = e;
            poster_path = kindOfLink.base_img_link + poster_path;
            backdrop_path = kindOfLink.base_img_link + backdrop_path;
            if (media_type === "tv") {
              let { name, original_name, first_air_date } = e;
              let title = name,
                original_title = original_name,
                release_date = first_air_date;
              movie = {
                overview,
                vote_count,
                media_type,
                id,
                poster_path,
                genre_ids,
                vote_average,
                backdrop_path,
                title,
                original_title,
                release_date,
              };
            }
            if (media_type === "movie") {
              let { title, original_title, release_date } = e;
              movie = {
                overview,
                vote_count,
                media_type,
                id,
                poster_path,
                genre_ids,
                vote_average,
                backdrop_path,
                title,
                original_title,
                release_date,
              };
            }
            if (media_type === undefined) {
              let { title, original_title, release_date } = e;
              movie = {
                overview,
                vote_count,
                media_type,
                id,
                poster_path,
                genre_ids,
                vote_average,
                backdrop_path,
                title,
                original_title,
                release_date,
              };
            }
            toprated1[toprated1.length] = movie;
          });
          this.setState({ toprated: toprated1 });
          // console.log(this.state.toprated);
          break;
        default:
          break;
      }
    } catch (error) {}
  };

  render() {
    let { upcoming, popular, trending } = this.state;
    // console.log(upcoming);
    return (
      <div className="app">
        <Router>
          <HeaderApp />
          <div>
            <ContentApp trending={trending} popular={popular} />
          </div>
          <FooterApp />
        </Router>
      </div>
    );
  }
}

class HeaderApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_state: false,
      search_state_check: false,
      search_keyString: "",
      trending: [
        "Nhan",
        "Handsome",
        "Kind",
        "Nhan",
        "Handsome",
        "Kind",
        "Nhan",
        "Handsome",
        "Kind",
        "Nhan",
      ],
      search_icon_suggest: {
        wait: "inline-block",
        display: "none",
      },
      header_bar: true,
    };
  }

  componentDidMount() {
    document.addEventListener("wheel", this.handleWheelAnywhere, true);
  }

  componentWillUnmount() {
    document.removeEventListener("wheel", this.handleWheelAnywhere, true);
  }

  handleWheelAnywhere = (e) => {
    if (e.deltaY < 0) {
      this.setState({
        search_state_check: false,
        header_bar: true,
      });
    } else if (e.deltaY > 0) {
      this.setState({
        search_state_check: false,
        header_bar: false,
      });
    }
  };

  handleClickSearch = () => {
    let { search_state } = this.state;
    this.setState({
      search_state: !this.state.search_state,
      search_state_check: false,
      search_icon_suggest: {
        display: search_state ? "inline-block" : "none",
        wait: search_state ? "none" : "inline-block",
      },
    });
  };

  headerSuggestAnimationEnd = () => {
    this.setState({
      search_state_check: true,
      search_icon_suggest: {
        wait: "none",
        display: "inline-block",
      },
    });
  };

  updateSearchStateCheck = (x) => {
    x
      ? this.setState({
          search_state_check: false,
          search_icon_suggest: {
            wait: "inline-block",
            display: "none",
          },
        })
      : this.setState({
          search_state_check: false,
          search_icon_suggest: {
            wait: "none",
            display: "inline-block",
          },
        });
  };

  render() {
    let { search_icon_suggest, search_keyString, search_state_check } =
      this.state;
    let { display, wait } = this.state.search_icon_suggest;
    let { search_state, header_bar } = this.state;
    return (
      <div className="header" style={{ top: header_bar ? "0" : "-60px" }}>
        <div className="header-bar">
          <div className="">
            <Link
              to="/webFilmClub/"
              name="home"
              className="header-bar-link link-decoration"
            >
              <img src={Logo} alt="logo web" className="home"></img>
            </Link>
            <Link
              to="/webFilmClub/movie"
              className="header-bar-link link-decoration"
            >
              <span className="header-bar-text ">Movie</span>
            </Link>
            <Link
              to="/webFilmClub/collection"
              className="header-bar-link link-decoration"
            >
              <span className="header-bar-text ">Collection</span>
            </Link>
            <Link
              to="/webFilmClub/FAQ"
              className="header-bar-link link-decoration"
            >
              <span className="header-bar-text">FAQ</span>
            </Link>
          </div>
          <button
            className="header-bar-search"
            onClick={this.handleClickSearch}
          >
            {search_state ? (
              <span className="header-bar-icon-back" style={{ color: "white" }}>
                X
              </span>
            ) : (
              <AiOutlineSearch className="header-bar-icon-infront" />
            )}
          </button>
        </div>
        <HeaderSearchResult
          search_keyString={search_keyString}
          search_state_check={search_state_check}
          display={display}
          search_icon_suggest={search_icon_suggest}
          wait={wait}
          search_state={search_state}
          headerSuggestAnimationEnd={this.headerSuggestAnimationEnd}
          trending={this.state.trending}
          updateSearchStateCheck={this.updateSearchStateCheck}
        />
      </div>
    );
  }
}

class HeaderSearchResult extends Component {
  state = { search_state_check: 0 };
  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }

  handleClickOutside = (e) => {
    const domNode = ReactDOM.findDOMNode(this);

    if (!domNode || !domNode.contains(e.target)) {
      this.props.updateSearchStateCheck(false);
    }
  };

  handleClickResetSearchResult = () => {
    this.props.updateSearchStateCheck(true);
  };

  render() {
    return (
      <div>
        {this.props.search_state ? (
          <div className="header-search">
            <form className="header-search-tool">
              <AiOutlineSearch className="search-icon" />
              <input
                className="header-search-tool-filled"
                placeholder="search for movie..."
                type="text"
              ></input>
              <div className="close-icon">
                <span
                  className="close-icon-wait"
                  style={{ display: this.props.wait }}
                  onAnimationEnd={this.props.headerSuggestAnimationEnd}
                ></span>
                <AiOutlineClose
                  className="close-icon-display"
                  style={{ display: this.props.display }}
                  onClick={this.handleClickResetSearchResult}
                />
              </div>
            </form>
            <div className="header-search-result">
              {this.props.search_keyString === "" ? (
                <div
                  style={{
                    display: this.props.search_state_check ? "block" : "none",
                  }}
                >
                  <div className="header-search-result-trending">
                    <FiTrendingUp className="trending-icon" />
                    <span className="trending-text">Trending</span>
                  </div>
                  {this.props.trending.slice(0, 10).map((x, i) => {
                    return (
                      <div key={i} className="header-search-result-items">
                        <AiOutlineSearch className="icon" />
                        <span className="text">{x}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

//////////////////////////////////////////ContentApp///////////////////////////////////////////////////
class ContentApp extends Component {
  render() {
    return (
      <div className="contentApp">
        <Switch>
          <Route exact path="/webFilmClub/">
            <Home popular={this.props.popular} trending={this.props.trending} />
          </Route>
          <Route path="/webFilmClub/collection">
            <Collection />
          </Route>
          <Route path="/webFilmClub/FAQ">
            <FAQ />
          </Route>
        </Switch>
      </div>
    );
  }
}

////////////////////////////////////footer///////////////////////////////////////////////////////
const FooterApp = () => {
  return (
    <div className="footer">
      <div className="text">
        <h4>My Film CLub</h4>
      </div>
      <div className="icon">
        {/* <IconContext.Provider value={{ backgroungColor: "#61dbfb" }}> */}
        <FaGithub className="react-icons" />
        <FaTwitter className="react-icons" />
        <FaLinkedin className="react-icons" />
        {/* </IconContext.Provider> */}
      </div>
    </div>
  );
};
