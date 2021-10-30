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
  AiFillEyeInvisible,
  AiFillEye,
} from "react-icons/ai";
import { FaGithub, FaTwitter, FaLinkedin, FaAsterisk } from "react-icons/fa";
import avatar from "../src/images/250577775_1336573440093459_1633910632867587638_n.jpg";
// import { BsCollectionPlayFill } from "react-icons/bs";
///////////////////////////////////////////////////import library function
import {
  // BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import film_collection from "./filmCollection.json";
import { Home, Collection, FAQ, Movie, Film, Search } from "./contentApp";
import history from "./history";
import { Router } from "react-router-dom";
import reactDom from "react-dom";

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
      genres: {},
      genre_ids: [],
      release_year: [],
      display_film: {},
      search: [],
      control_login: false,
      login: false,
      countlogin: 0,
      login_timecounter: 0,
      passvisible: false,
    };
    this.constVari = {
      password: "1",
      username: "nhantran",
      timeban: 30,
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

  controlLogin = (x) => {
    this.setState({ control_login: x });
  };

  accessAccount = (user, pass) => {
    let { password, username } = this.constVari;
    let { login, control_login, countlogin, login_timecounter } = this.state;
    if (user === username) {
      if (pass === password) {
        login = true;
        control_login = false;
        this.setState({ login, control_login, countlogin: 0 });
      }
    } else {
      countlogin = countlogin + 1;
      if (countlogin > 4) {
        login_timecounter = 30;
        this.setState({ login_timecounter });
        let id_interval = setInterval(() => {
          login_timecounter = login_timecounter - 1;
          login_timecounter === 0
            ? this.setState({ login_timecounter })
            : this.setState({ login_timecounter });
          if (login_timecounter === 0) clearInterval(id_interval);
        }, 1000);
      }
      this.setState({ countlogin });
    }
  };

  resetLogInCounter = () => {
    this.setState({ countlogin: 0 });
  };

  switchPassVisible = (el) => {
    this.setState({ passvisible: el });
  };

  handleLogout = () => {
    this.setState({ login: false });
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
      search,
      control_login,
      login,
      countlogin,
      passvisible,
      login_timecounter,
    } = this.state;
    console.log(passvisible);
    // console.log(genres);
    return (
      <div className="app">
        <Router history={history}>
          <HeaderApp
            trending={trending}
            search={search}
            movies={movies}
            controlLogin={(el) => this.controlLogin(el)}
            accessAccount={(user, pass) => this.accessAccount(user, pass)}
            resetloginCounter={() => this.resetLoginCounter()}
            switchPassVisible={(el) => this.switchPassVisible(el)}
            handleLogout={() => this.handleLogout()}
            control_login={control_login}
            login={login}
            countlogin={countlogin}
            login_timecounter={login_timecounter}
            passvisible={passvisible}
          />
          <div className="header-area"></div>
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
              controlLogin={(el) => this.controlLogin(el)}
              control_login={control_login}
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
      trending: this.props.trending,
      search_icon_suggest: {
        wait: "inline-block",
        display: "none",
      },
      header_bar: true,
      password: "",
      username: "",
      // note_empty: false,
      invisetting_state: false,
    };
  }

  componentDidMount() {
    document.addEventListener("wheel", this.handleWheelAnywhere, true);
    window.addEventListener("scroll", this.handleScrollTop, true);
    document.addEventListener("click", this.handleClickAnywhere);
  }

  componentWillUnmount() {
    document.removeEventListener("wheel", this.handleWheelAnywhere, true);
    window.removeEventListener("scroll", this.handleScrollTop, true);
    document.removeEventListener("click", this.handleClickAnywhere);
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

  handleScrollTop = (e) => {
    // console.log("handleScrollTop");
    // console.log(e);
    // console.log(window.scrollY);

    if (window.scrollY === 0) this.setState({ header_bar: true });
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

  handleClickAnywhere = (event) => {
    // const dom_avatarnode = reactDom.findDOMNode(this.invisetting);
    if (!this.invisetting.contains(event.target))
      this.setState({ invisetting_state: false });
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

  turnOffSearchHeader = () => {
    this.setState({ search_state: false });
  };

  render() {
    let {
      search_icon_suggest,
      search_keyString,
      search_state_check,
      // note_empty,
    } = this.state;
    let { display, wait } = this.state.search_icon_suggest;
    let { search_state, header_bar, trending, invisetting_state } = this.state;
    // console.log(trending);
    return (
      <div className="header" style={{ top: header_bar ? "0" : "-60px" }}>
        <div className="header-bar">
          <div className="">
            <Link
              to="/WebPhimClub/"
              name="home"
              className="header-bar-link link-decoration"
            >
              <div style={{ width: "60px", height: "60px" }}>
                <img src={Logo} alt="logo web" className="home"></img>
              </div>
            </Link>
            <Link
              to="/WebPhimClub/movie"
              className="header-bar-link link-decoration"
            >
              <span className="header-bar-text noselect">Movie</span>
            </Link>
            {/* <Link
              to="/WebPhimClub/collection"
              className="header-bar-link link-decoration"
            >
              <span className="header-bar-text noselect">Collection</span>
            </Link> */}
            <Link
              to="/WebPhimClub/FAQ"
              className="header-bar-link link-decoration"
            >
              <span className="header-bar-text noselect">FAQ</span>
            </Link>
          </div>
          <div>
            <div>
              <button
                className="header-bar-login noselect"
                onClick={() => this.props.controlLogin(true)}
                style={{ display: this.props.login ? "none" : "block" }}
              >
                Login
              </button>

              <div
                className="header-bar-login noselect"
                style={{ display: this.props.login ? "flex" : "none" }}
              >
                <div
                  className="header-bar-login-img"
                  ref={(el) => (this.invisetting = el)}
                  onClick={() =>
                    this.setState({ invisetting_state: !invisetting_state })
                  }
                >
                  <img src={avatar} alt={`avatar of ${this.state.username}`} />
                </div>
                <div
                  className="header-bar-login-feature"
                  style={{ display: invisetting_state ? "block" : "none" }}
                >
                  <Link
                    to="/WebPhimClub/collection"
                    className="link-decoration"
                  >
                    <span>Colection</span>
                  </Link>
                  <span
                    onClick={() => {
                      this.setState({ username: "", password: "" });
                      this.props.handleLogout();
                    }}
                  >
                    Logout
                  </span>
                </div>
              </div>
              <div
                className="wrap-login"
                style={{
                  display: this.props.control_login ? "block" : "none",
                }}
              >
                <div className="login">
                  <div
                    className="login-close"
                    onClick={(e) => {
                      this.props.controlLogin(false);
                      // e.preventDefault()
                    }}
                  >
                    <AiOutlineClose />
                  </div>
                  <form
                    onSubmit={(e) => {
                      console.log("object");
                      if ((this.state.username === "") | this.state.password)
                        // this.setState({ note_empty: true });
                        alert("Please fill username and pasword");
                      else {
                        this.props.login_timecounter === 0
                          ? this.props.accessAccount(
                              this.state.username,
                              this.state.password
                            )
                          : alert(`you have to wait ${this.props.login_timecounter}s for
                    the next time`);
                      }
                      e.preventDefault();
                    }}
                  >
                    <div className="inputfield">
                      <label>
                        <span>Username:</span>
                        <input
                          type="text"
                          placeholder="Username"
                          value={this.state.username}
                          onChange={(e) =>
                            this.setState({ username: e.target.value })
                          }
                        ></input>
                      </label>
                    </div>
                    <div className="inputfield">
                      <label>
                        <span>Password:</span>
                        <input
                          type={this.props.passvisible ? "text" : "password"}
                          placeholder="Password"
                          value={this.state.password}
                          onChange={(e) =>
                            this.setState({ password: e.target.value })
                          }
                        ></input>
                      </label>
                      <div className="passvisible">
                        <AiFillEye
                          style={{
                            display: this.props.passvisible ? "none" : "inline",
                          }}
                          onClick={() => {
                            // console.log("object");
                            this.props.switchPassVisible(true);
                          }}
                        />
                        <AiFillEyeInvisible
                          style={{
                            display: this.props.passvisible ? "inline" : "none",
                          }}
                          onClick={() => this.props.switchPassVisible(false)}
                        />
                      </div>
                    </div>
                    <div className="login-note">
                      <div>
                        <div
                          style={{
                            display:
                              this.props.login_timecounter === 0
                                ? "block"
                                : "none",
                          }}
                        >
                          <FaAsterisk />
                          <span>
                            Login failed more than 5 times will have to waite
                            30s for the next times
                          </span>
                        </div>

                        <div
                          style={{
                            display:
                              this.props.login_timecounter > 0
                                ? "block"
                                : "none",
                          }}
                        >
                          <FaAsterisk />
                          <span>
                            You have to wait {this.props.login_timecounter}s for
                            the next time
                          </span>
                        </div>
                      </div>

                      {/* <div style={{ display: note_empty ? "block" : "none" }}>
                      <FaAsterisk />
                      <span> please fill user and password</span>
                    </div> */}
                    </div>
                    <div className="login-control">
                      <button
                        onClick={(e) => {
                          console.log("object");
                          console.log(this.state.username);
                          console.log(this.state.password);
                          if (
                            (this.state.username === "") |
                            (this.state.password === "")
                          )
                            // this.setState({ note_empty: true });
                            alert("Please fill username and pasword");
                          else {
                            this.props.login_timecounter === 0
                              ? this.props.accessAccount(
                                  this.state.username,
                                  this.state.password
                                )
                              : alert(`you have to wait ${this.props.login_timecounter}s for
                      the next time`);
                          }

                          e.preventDefault();
                        }}
                      >
                        Login
                      </button>
                      <button
                        onClick={(e) => {
                          this.props.controlLogin(false);
                          e.preventDefault();
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
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
          trending={trending}
          updateSearchStateCheck={this.updateSearchStateCheck}
          search={this.props.search}
          movies={this.props.movies}
          close_SearchBoard={() => this.setState({ search_state: false })}
        />
      </div>
    );
  }
}

class HeaderSearchResult extends Component {
  state = {
    search_state_check: 0,
    trending: this.props.trending,
    search: this.props.search,
    searchArr_header: [],
    movies: this.props.movies,
    search_string: "",
  };
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
    this.setState({ search_string: "" });
    this.props.updateSearchStateCheck(true);
  };

  handleChangeSearchStr = (e) => {
    let { movies, searchArr_header } = this.state;
    let search_string = e.target.value;
    // console.log(e.keyCode);
    // if (e.keyCode === 27) {
    //   search_string = "";
    // }
    let search_stringArr = search_string.split(" ");
    // console.log(search_string);
    // console.log(search_stringArr.length);
    searchArr_header.length = 0;
    search_stringArr.forEach((el, i) => {
      // console.log(el);
      if (i === 0) {
        movies.forEach((el1, i1) => {
          if (el1.title.indexOf(el) >= 0)
            searchArr_header[searchArr_header.length] = el1;
        });
        // console.log("searchArr_header1");
        // console.log(searchArr_header);
      } else {
        let temp_searchArr_header = [];
        searchArr_header.forEach((el1, i1) => {
          if (el1.title.indexOf(el) >= 0) {
            temp_searchArr_header[temp_searchArr_header.length] = el1;
          }
          // else console.log(el1.title);
        });
        searchArr_header.length = 0;
        searchArr_header = temp_searchArr_header;
        // console.log("searchArr_header2");
        // console.log(searchArr_header);
      }
    });
    // console.log("searchArr_header last:");
    // console.log("Gabriel's Inferno Part III".indexOf("on"));
    this.setState({ searchArr_header, search_string });
  };

  // handleSubmitSearchHeader = () => {
  //   let { search_string, searchArr_header } = this.state;
  // };

  render() {
    let { trending, searchArr_header, search_string } = this.state;
    // console.log(trending.day?.slice(0, 10));
    // console.log(trending.week);
    return (
      <div>
        {this.props.search_state ? (
          <div className="header-search">
            <form
              className="header-search-tool"
              onSubmit={(event) => {
                const path = "/webFilmClub/search/";
                let arr_search_string = search_string.split(" ");
                let convert_search_string = "";
                arr_search_string.forEach((el, i) =>
                  i === arr_search_string.length - 1
                    ? (convert_search_string = convert_search_string + el)
                    : (convert_search_string = convert_search_string + el + "-")
                );
                let path_searchSTR = "1?search=" + convert_search_string;
                if (search_string !== "") history.push(path + path_searchSTR);
                this.props.close_SearchBoard();
                event.preventDefault();
              }}
            >
              <AiOutlineSearch className="search-icon" />
              <input
                className="header-search-tool-filled"
                placeholder="search for movie..."
                type="text"
                onChange={this.handleChangeSearchStr}
                value={search_string}
                autoFocus
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
              {search_string === "" ? (
                <div
                  style={{
                    display: this.props.search_state_check ? "block" : "none",
                  }}
                >
                  <div className="header-search-result-trending">
                    <FiTrendingUp className="trending-icon" />
                    <span className="trending-text">Trending</span>
                  </div>
                  {trending.day?.slice(0, 10).map((x, i) => {
                    let { id, title } = x;
                    let titleArr = title.split(" ");
                    let title_str = "";
                    titleArr.forEach((el) => (title_str += "-" + el));
                    let link_part = "/webFilmClub/movie/" + id + title_str;
                    return (
                      <Link
                        to={link_part}
                        className="link-decoration"
                        onClick={this.props.close_SearchBoard}
                        key={i}
                      >
                        <div className="header-search-result-items link-decoration">
                          <AiOutlineSearch className="icon" />
                          <span className="text">{title}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div
                  style={{
                    display: this.props.search_state_check ? "block" : "none",
                  }}
                >
                  {/* <div className="header-search-result-trending">
                    <FiTrendingUp className="trending-icon" />
                    <span className="trending-text">Trending</span>
                  </div> */}
                  {searchArr_header?.slice(0, 10).map((x, i) => {
                    let { id, title } = x;
                    let titleArr = title.split(" ");
                    let title_str = "";
                    titleArr.forEach((el) => (title_str += "-" + el));
                    let link_part = "/webFilmClub/movie/" + id + title_str;
                    return (
                      <Link
                        to={link_part}
                        className="link-decoration"
                        onClick={this.props.close_SearchBoard}
                        key={i}
                      >
                        <div className="header-search-result-items link-decoration">
                          <AiOutlineSearch className="icon" />
                          <span className="text">{title}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
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
          <Route
            exact
            path="/WebPhimClub/"
            render={(props) => {
              return (
                <Home
                  popular={this.props.popular}
                  trending={this.props.trending}
                  history={props.history}
                />
              );
            }}
          />
          {/* <Home popular={this.props.popular} trending={this.props.trending} />
          </Route> */}
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

          <Route
            path="/webFilmClub/movie/:slug"
            render={(props) => {
              // console.log(props);
              return (
                <Film
                  history={props}
                  movies={this.props.movies}
                  genres={this.props.genres}
                />
              );
            }}
          />

          <Route
            path="/webFilmClub/search/:slug"
            render={(props) => {
              console.log("/webFilmClub/search/:slug");
              return (
                <Search
                  history={props}
                  movies={this.props.movies}
                  genres={this.props.genres}
                  release_year={this.props.release_year}
                />
              );
            }}
          />

          {/* {display_film ? (
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
          )} */}
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
