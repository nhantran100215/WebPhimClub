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
import { Home, Collection, FAQ, Movie, Film } from "./contentApp";

// D:\my work\web dev\javascript\reactjs\My_project\offline\WebPhimClub\public\icon_head.png
const kindOfLink = {
  collection: "Collection",
  movie: "movie",
  trending: "trending",
  popular: "popular",
  upcoming: "upcoming",
  toprated: "toprated",
  base_img_link: "https://image.tmdb.org/t/p/w500", //w500
  genres: "genres",
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
    case kindOfLink.genres:
      return `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`;
    default:
      break;
  }
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      trending: {
        day: [],
        week: [],
      },
      popular: [],
      upcoming: [],
      nowplaying: [],
      toprated: [],
      search: [],
      genres: {},
      genre_ids: [],
      release_year: [],
      display_film: {},
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
    this.getAPIMovieArr(kindOfLink.genres);
  }

  getAPIMovieArr = async (kind, id, time) => {
    let url = concateString(kind, id, time);
    try {
      const response = await fetch(url);
      let datafet = await response.json();
      // console.log(datafet);
      switch (kind) {
        case kindOfLink.collection:
          {
            let { movies, release_year } = this.state;
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
                popularity,
                genre_ids,
              } = film;
              poster_path = kindOfLink.base_img_link + poster_path;
              backdrop_path = kindOfLink.base_img_link + backdrop_path;
              movies[movies.length] = {
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
                popularity,
                genre_ids,
              };
              if (!release_year.includes(release_date.slice(0, 4)))
                release_year[release_year.length] = release_date.slice(0, 4);
              // console.log(release_date);
              // console.log(release_date.slice(0, 4));
            }
            this.setState({ movies: movies, release_year: release_year });
            // console.log(this.state.movie);
          }
          break;
        case kindOfLink.trending:
          {
            // console.log(datafet.results);
            let trending1 = [];
            let { movies, release_year } = this.state;
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
                popularity,
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
                  popularity,
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
                  popularity,
                };
              }
              trending1[trending1.length] = movie;
              let check_movie_again = false;
              movies.forEach((e) => {
                // console.log(movie.id);
                if (e.id === movie.id) {
                  check_movie_again = true;
                }
              });
              if (!check_movie_again) {
                movies.unshift(movie);
                check_movie_again = false;
              }
              if (!release_year.includes(movie.release_date.slice(0, 4)))
                release_year[release_year.length] = movie.release_date.slice(
                  0,
                  4
                );
            });

            // console.log(movies);
            let { trending } = this.state;
            if (time === "day") trending.day = trending1;
            if (time === "week") trending.week = trending1;
            this.setState({ trending, movies, release_year });
            // console.log(trending1);
            // console.log(this.state);
            // console.log(url);
          }
          break;

        case kindOfLink.popular:
          {
            // console.log(datafet);
            let popular1 = [];
            let { movies, release_year } = this.state;
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
                popularity,
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
                  popularity,
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
                  popularity,
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
                  popularity,
                };
              }
              // console.log(movie);
              popular1[popular1.length] = movie;
              let check_movie_again = false;
              movies.forEach((e) => {
                // console.log(movie.id);
                if (e.id === movie.id) {
                  check_movie_again = true;
                }
              });
              if (!check_movie_again) {
                movies.unshift(movie);
                check_movie_again = false;
              }
              if (!release_year.includes(movie.release_date.slice(0, 4)))
                release_year[release_year.length] = movie.release_date.slice(
                  0,
                  4
                );
            });
            // let { popular } = this.state;
            // if (time === "day") popular.day = popular1;
            // if (time === "week") popular.week = popular1;
            this.setState({ popular: popular1, movies: movies, release_year });
            // console.log(this.state.popular);
          }
          break;

        case kindOfLink.upcoming:
          {
            // console.log(datafet);
            let upcoming1 = [];
            let { movies, release_year } = this.state;
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
                popularity,
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
                  popularity,
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
                  popularity,
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
                  popularity,
                };
              }
              upcoming1[upcoming1.length] = movie;
              let check_movie_again = false;
              movies.forEach((e) => {
                // console.log(movie.id);
                if (e.id === movie.id) {
                  check_movie_again = true;
                }
              });
              if (!check_movie_again) {
                movies.unshift(movie);
                check_movie_again = false;
              }
              if (!release_year.includes(movie.release_date.slice(0, 4)))
                release_year[release_year.length] = movie.release_date.slice(
                  0,
                  4
                );
            });
            // let { popular } = this.state;
            // if (time === "day") popular.day = popular1;
            // if (time === "week") popular.week = popular1;
            this.setState({
              upcoming: upcoming1,
              movies: movies,
              release_year,
            });
            // console.log(this.state.upcoming);
          }
          break;

        case kindOfLink.toprated:
          {
            // console.log(datafet);
            let toprated1 = [];
            let { movies, release_year } = this.state;
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
                popularity,
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
                  popularity,
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
                  popularity,
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
                  popularity,
                };
              }
              toprated1[toprated1.length] = movie;
              let check_movie_again = false;
              movies.forEach((e) => {
                // console.log(movie.id);
                if (e.id === movie.id) {
                  check_movie_again = true;
                }
              });
              if (!check_movie_again) {
                movies.unshift(movie);
                check_movie_again = false;
              }
              if (!release_year.includes(movie.release_date.slice(0, 4)))
                release_year[release_year.length] = movie.release_date.slice(
                  0,
                  4
                );
            });
            this.setState({
              toprated: toprated1,
              movies: movies,
              release_year,
            });
            // console.log(this.state.toprated);
          }
          break;

        case kindOfLink.genres:
          // console.log(datafet);
          let { genres } = this.state;
          datafet.genres.forEach((e, i) => {
            genres[e.id] = e.name;
          });
          // console.log("genres");
          // console.log(movies);
          this.setState({ genres: genres });
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleDisplayFilm = (film) => {
    console.log("filmsdadasdada");
    this.setState({ display_film: film });
  };

  render() {
    let {
      upcoming,
      popular,
      trending,
      genres,
      movies,
      release_year,
      display_film,
    } = this.state;
    // console.log(movies);
    // console.log(genres);
    return (
      <div className="app">
        <Router>
          <HeaderApp />
          <div>
            <ContentApp
              trending={trending}
              popular={popular}
              genres={genres}
              upcoming={upcoming}
              movies={movies}
              release_year={release_year}
              display_film={display_film}
              handleDisplayFilm={(el) => this.handleDisplayFilm(el)}
            />
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
              to="/WebPhimClub/"
              name="home"
              className="header-bar-link link-decoration"
            >
              <img src={Logo} alt="logo web" className="home"></img>
            </Link>
            <Link
              to="/WebPhimClub/movie"
              className="header-bar-link link-decoration"
            >
              <span className="header-bar-text noselect">Movie</span>
            </Link>
            <Link
              to="/WebPhimClub/collection"
              className="header-bar-link link-decoration"
            >
              <span className="header-bar-text noselect">Collection</span>
            </Link>
            <Link
              to="/WebPhimClub/FAQ"
              className="header-bar-link link-decoration"
            >
              <span className="header-bar-text noselect">FAQ</span>
            </Link>
          </div>
          <div>
            <button className="header-bar-signin noselect">Sign In</button>
            <button
              className="header-bar-search"
              onClick={this.handleClickSearch}
            >
              {search_state ? (
                <span
                  className="header-bar-icon-back"
                  style={{ color: "white" }}
                >
                  X
                </span>
              ) : (
                <AiOutlineSearch className="header-bar-icon-infront" />
              )}
            </button>
          </div>
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
    // console.log(this.props.location);
    let { display_film } = this.props;
    return (
      <div className="contentApp">
        <Switch>
          <Route exact path="/WebPhimClub/">
            <Home popular={this.props.popular} trending={this.props.trending} />
          </Route>
          <Route
            exact
            path="/WebPhimClub/movie"
            render={(props) => {
              // console.log(props);
              return (
                <Movie
                  location={props.location}
                  history={props.history}
                  movies={this.props.movies}
                  genres={this.props.genres}
                  release_year={this.props.release_year}
                  handleDisplayFilm={(el) => this.props.handleDisplayFilm(el)}
                />
              );
            }}
          />
          {display_film ? (
            () => {
              let path_temp =
                display_film.id + "-" + display_film.title.replace(" ", "-");
              console.log(path_temp);
              return (
                <Route
                  path={"/WebPhimClub/movie" + path_temp}
                  render={(props) => {
                    // console.log(props);
                    return <Film display_film={display_film} />;
                  }}
                />
              );
            }
          ) : (
            <div></div>
          )}
          {/* {this.props.movies.map((elfilm) => {
            // console.log(elfilm);
            let path_temp = elfilm.id + "-" + elfilm.title.replace(" ", "-");
            // console.log(path_temp);
            return (
              <Route
                path={"/WebPhimClub/movie" + path_temp}
                render={(props) => {
                  // console.log(props);
                  return <Film elfilm={elfilm} />;
                }}
              />
            );
          })} */}
          <Route path="/WebPhimClub/collection">
            <Collection />
          </Route>
          <Route path="/WebPhimClub/FAQ">
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
