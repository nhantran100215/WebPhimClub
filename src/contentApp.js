import React, { Component } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useParams,
  // browserHistory,
} from "react-router-dom";
import { CircleProcessBar } from "./lib/tool/tool";
import { GiNextButton } from "react-icons/gi";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
// import { browserHistory } from "react-router";

const sortValue = [
  "Popularity Descending",
  "Popularity Ascending",
  "Rating Descending",
  "Rating Ascending",
  "Release Year Descending",
  "Release Year Ascending",
  "Title(A-Z)",
  "Title(z-A)",
];

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trendingDay: false,
      width_trendingHeaderToday: 62,
      width_trendingHeaderWeek: 112,
    };
  }
  componentDidMount() {
    ////////////////get resize of element///////////////////////////////////////////////////
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  }

  handleResize = () => {
    console.log("handleResize");
    if (this.today1) {
      // console.log(this.today1.clientWidth);
      // console.log(this.thisWeek1.clientWidth);
      this.setState({
        width_trendingHeaderToday: this.today1.clientWidth,
        width_trendingHeaderWeek: this.thisWeek1.clientWidth,
      });
    }
  };

  handleToggleTrendind = (x) => {
    this.setState({ trendingDay: x });
  };
  render() {
    // console.log(this.props.popular);
    // console.log("poster_path");
    // console.log(this.props.trending);
    // console.log(this.today.current);
    // console.log(this.thisWeek.current);
    let { trendingDay } = this.state;
    let trending = [];
    trendingDay
      ? (trending = this.props.trending.week)
      : (trending = this.props.trending.day);
    let Today = this.state.width_trendingHeaderToday + "px";
    let Week = this.state.width_trendingHeaderWeek + "px";
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
                <div className="movieBannerH" key={i}>
                  <Link
                    to={"/webFilmClub/movie/" + part_link}
                    key={i}
                    className="link-decoration"
                  >
                    <div className="movieBannerH-image">
                      <img src={poster_path} alt={title} />
                      <div className="wrap-circleProcessBar">
                        <CircleProcessBar percent={vote_average * 10} />
                      </div>
                    </div>
                    <div className="movieBannerH-averRate"></div>
                    <div className="movieBannerH-title">
                      <h4>{title}</h4>
                      <h5>{release_date}</h5>
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
              <div className="home-popular-header-toggle noselect">
                <div
                  ref={(today1) => (this.today1 = today1)}
                  // ref={(el) => this.handleResizeToday(el)}
                  className="bythetime"
                  onClick={() => this.handleToggleTrendind(false)}
                  style={trendingDay ? { color: "black" } : { color: "white" }}
                >
                  Today
                </div>
                <div
                  ref={(thisWeek1) => (this.thisWeek1 = thisWeek1)}
                  // ref={(el) => this.handleResizeWeek(el)}
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
                      ? { left: Today, width: Week }
                      : { left: 0, width: Today }
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
                  <div className="movieBannerH" key={i}>
                    <Link
                      to={"/webFilmClub/movie/" + part_link}
                      key={i}
                      className="link-decoration"
                    >
                      <div className="movieBannerH-image">
                        <img src={poster_path} alt={title} />
                        <div className="wrap-circleProcessBar">
                          <CircleProcessBar percent={vote_average * 10} />
                        </div>
                      </div>
                      <div className="movieBannerH-averRate"></div>
                      <div className="movieBannerH-title">
                        <h4>{title}</h4>
                        <h5>{release_date}</h5>
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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
//////////////////////////movie page/////////////////////////////////////////////////////////////////////
export class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ////////variable of parent
      movies: this.props.movies,
      amount_page_movies: 0,
      genres: this.props.genres,
      release_year: this.props.release_year,
      history: this.props.history,
      location: this.props.location,
      /////////variable of child
      search: [],
      amount_page_search: 0,
      check_search: false,
      amount_displayPage: 8,
      amount_movie_page: 24,
      keywords: "",
      genres_search: [],
      display_first_page: 1,
      display_last_page: 1,
      display_page: 1,
      value_page_goto: null,
      search_movie_disabled: false,
      sort: {
        sort_open: false,
        sort_result: "",
      },
      filter: {
        filter_open: false,
        year: -1,
        genres: [],
      },
    };
  }

  static getDerivedStateFromProps(props, state) {
    // let { search } = nextprops;
    let { release_year, movies } = props;
    let { amount_movie_page, amount_displayPage, display_page } = state;
    let amount_page_movies =
      Math.floor(movies.length / amount_movie_page) +
      (movies.length / amount_movie_page >
      Math.floor(movies.length / amount_movie_page)
        ? 1
        : 0);
    release_year = release_year.sort((x, y) => Number(y) - Number(x));
    if (amount_page_movies !== state.amount_page_movies) {
      return {
        amount_page_movies: amount_page_movies,
        release_year: release_year,
        // search: movies,
        // display_first_page: 1,
        // display_last_page: amount_displayPage,
      };
    }

    let { search } = window.location;
    if (search) {
      // search=search.replace("?","");
      let varia = search.split(/[?=&]/);
      console.log(varia);
      let check_page = varia.findIndex((el) => el === "page");
      console.log(Number(varia[check_page + 1]));
      // let { display_first_page, display_last_page } =
      // this.calc_firstLastPage(Number(varia[check_page + 1]));
      if (check_page !== -1 && display_page !== Number(varia[check_page + 1]))
        return {
          display_page: Number(varia[check_page + 1]),
          // display_first_page: display_first_page,
          // display_last_page: display_last_page,
        };
    } else return { display_page: 1 };

    return null;
  }

  componentDidMount() {
    let { search } = window.location;
    let { display_first_page, display_last_page, display_page } = this.state;
    console.log("search");
    window.addEventListener("resize", this.handleWindowResize);
    this.handleWindowResize();
    if (search) {
      // search=search.replace("?","");
      let varia = search.split(/[?=&]/);
      console.log(varia);
      let check_page = varia.findIndex((el) => el === "page");
      console.log(Number(varia[check_page + 1]));
      if (check_page !== -1 && display_page !== Number(varia[check_page + 1]))
        this.setState({ display_page: Number(varia[check_page + 1]) });
    } else this.setState({ display_page: 1 });
    if (
      (display_first_page > display_page) |
      (display_last_page < display_page)
    )
      this.handlePageTransition("pageclick", display_page, null);
    ////////////////get resize of element///////////////////////////////////////////////////
  }

  handleWindowResize = () => {
    console.log("window.innerHeight");
    console.log(window.innerWidth);
    let { display_page, display_first_page, display_last_page } = this.state;

    if (550 < window.innerWidth < 740) {
      let amount_displayPage = 5;
      display_first_page =
        display_page > Math.floor(amount_displayPage / 2)
          ? display_page - Math.floor(amount_displayPage / 2)
          : 1;
      display_last_page = amount_displayPage + display_first_page - 1;
      this.setState({
        amount_displayPage: amount_displayPage,
        display_last_page,
        display_first_page,
      });
    }

    // if (window.innerWidth <= 550) {
    //   let amount_displayPage = 3;
    //   display_first_page =
    //     display_page > Math.floor(amount_displayPage / 2)
    //       ? display_page - Math.floor(amount_displayPage / 2)
    //       : 1;
    //   display_last_page = amount_displayPage + display_first_page - 1;
    //   this.setState({
    //     amount_displayPage: amount_displayPage,
    //     display_last_page,
    //     display_first_page,
    //   });
    // }

    if (window.innerWidth >= 740) {
      let amount_displayPage = 8;
      display_first_page =
        display_page > Math.floor(amount_displayPage / 2)
          ? display_page - Math.floor(amount_displayPage / 2)
          : 1;
      display_last_page = amount_displayPage + display_first_page - 1;
      this.setState({
        amount_displayPage: amount_displayPage,
        display_last_page,
        display_first_page,
      });
    }
  };

  componentWillUnmount() {
    // super.componentWillUnmount();
    // // Unbind listener
    // this.backListener();
  }

  handlePageTransition = (form, num, event) => {
    let {
      display_first_page,
      display_last_page,
      amount_page_movies,
      amount_page_search,
      check_search,
      amount_displayPage,
      display_page,
      value_page_goto,
    } = this.state;
    let display_fontpage = 1;
    let amount_page = check_search ? amount_page_search : amount_page_movies;

    // console.log(num);

    if (form === "nextpage") {
      if (display_page < amount_page) num = display_page + 1;
      else num = amount_page;
    }

    // console.log(num);

    if (form === "gotopage") {
      num = Number(this.state.value_page_goto);
      console.log("num");
      // console.log(num);
    }
    // console.log(num);

    if (num <= display_first_page) {
      if (num - Math.floor(amount_displayPage / 2) > 0)
        display_first_page = num - Math.floor(amount_displayPage / 2);
      else {
        display_first_page = 1;
      }
      display_fontpage = 1 + num - display_first_page;
      if (num + amount_displayPage - display_fontpage <= amount_page)
        display_last_page = num + amount_displayPage - display_fontpage;
      else {
        display_last_page = amount_page;
      }
    }
    if (num >= display_last_page) {
      // console.log(num + Math.floor(amount_displayPage / 2));
      if (num + Math.floor(amount_displayPage / 2) <= amount_page) {
        display_last_page = num + Math.floor(amount_displayPage / 2);
        console.log(display_last_page);
      } else {
        display_last_page = amount_page;
      }
      display_fontpage = display_last_page - num + 1;
      // console.log("display_fontpage");
      // console.log(display_fontpage);
      if (num - amount_displayPage + display_fontpage > 0)
        display_first_page = num - amount_displayPage + display_fontpage;
      else {
        display_first_page = 1;
      }
    }
    // console.log(display_first_page, display_last_page, num);
    // console.log(num);

    //////////////////////get history//////////////////////////////////////////////////////
    let { history } = this.state;
    switch (form) {
      case "clickpage":
        if (history.location.search) {
          // let index = history.location.search.search("page");
          num !== 1
            ? (history.location.search = history.location.search.replace(
                /page=[0-9]+$/,
                "page=" + num
              ))
            : (history.location.search = "");
        } else {
          history.location.search = "?page=" + num;
        }
        this.props.history.push({
          pathname: history.location.pathname,
          search: history.location.search,
          state: {},
        });
        this.setState({
          display_page: num,
          display_first_page: display_first_page,
          display_last_page: display_last_page,
        });
        break;

      case "nextpage":
        if (history.location.search) {
          // let index = history.location.search.search("page");
          num !== 1
            ? (history.location.search = history.location.search.replace(
                /page=[0-9]+$/,
                "page=" + num
              ))
            : (history.location.search = "");
        } else {
          history.location.search = "?page=" + num;
        }
        this.props.history.push({
          pathname: history.location.pathname,
          search: history.location.search,
          state: {},
        });
        this.setState({
          display_page: num,
          display_first_page,
          display_last_page,
        });
        break;

      case "gotopage":
        if (history.location.search) {
          // let index = history.location.search.search("page");
          num !== 1
            ? (history.location.search = history.location.search.replace(
                /page=[0-9]+$/,
                "page=" + num
              ))
            : (history.location.search = "");
        } else {
          history.location.search = "?page=" + num;
        }
        this.props.history.push({
          pathname: history.location.pathname,
          search: history.location.search,
          state: {},
        });
        this.setState({
          display_page: num,
          display_first_page,
          display_last_page,
          // value_page_goto: null,
        });
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  handleChangeInputGoto = (event) => {
    this.setState({ value_page_goto: event.target.value.replace(/\D/, "") });
  };

  calc_firstLastPage = (numpage) => {
    let { amount_page, amount_displayPage } = this.state;
    let display_first_page = 0,
      display_last_page = 0;
    if (numpage < Math.floor(amount_displayPage / 2)) {
      display_first_page = 1;
      display_last_page = amount_displayPage;
    } else if (numpage > amount_page - Math.floor(amount_displayPage / 2)) {
      display_last_page = amount_page;
      display_first_page = amount_page - amount_displayPage + 1;
    } else {
      display_first_page = numpage - Math.floor(amount_displayPage / 2) + 1;
      display_last_page = display_first_page + amount_displayPage - 1;
    }
    console.log(display_first_page, display_last_page);
    return { display_first_page, display_last_page };
  };

  handleClickFilterButton = () => {
    let {
      search,
      sort,
      filter,
      amount_page,
      amount_movie_page,
      movies,
      display_last_page,
      display_page,
      amount_displayPage,
    } = this.state;
    console.log(sort, filter, search, amount_page, movies);
    //////sort by.///////////////
    search = movies;
    switch (sort.sort_result) {
      case "Popularity Descending":
        search.sort((a, b) => Number(b.popularity) - Number(a.popularity));
        // console.log(search);
        break;
      case "Popularity Ascending":
        search.sort((a, b) => Number(a.popularity) - Number(b.popularity));
        // console.log(search);
        break;
      case "Rating Descending":
        search.sort((a, b) => Number(b.vote_average) - Number(a.vote_average));
        // console.log(search);
        break;
      case "Rating Ascending":
        search.sort((a, b) => Number(a.vote_average) - Number(b.vote_average));
        // console.log(search);
        break;
      case "Release Year Descending":
        search.sort((a, b) => {
          if (a.release_date < b.release_date) return 1;
          else return -1;
        });
        // console.log(search);
        break;
      case "Release Year Ascending":
        search.sort((a, b) => {
          if (a.release_date < b.release_date) return -1;
          else return 1;
        });
        // console.log(search);
        break;
      case "Title(A-Z)":
        search.sort((a, b) => {
          if (a.title < b.title) return 1;
          else return -1;
        });
        console.log(search);
        break;
      case "Title(z-A)":
        search.sort((a, b) => {
          if (a.title < b.title) return -1;
          else return 1;
        });
        console.log(search);
        break;

      default:
        break;
    }
    ////////filter by year///////////////////
    if (filter.year > 1000)
      search = search.filter((e) => {
        console.log(e.release_date);
        console.log(filter.year);
        return e.release_date?.includes(filter.year);
      });
    ///////filter by genres///////////////
    console.log(filter.genres);
    if (filter.genres.length !== 0)
      filter.genres.forEach((el) => {
        console.log("el", el);
        search = search.filter((e) => {
          return e.genre_ids?.includes(Number(el));
        });
      });
    let remainder =
      search.length / amount_movie_page >
      Math.floor(search.length / amount_movie_page)
        ? 1
        : 0;

    amount_page = Math.floor(search.length / amount_movie_page) + remainder;
    console.log(search, amount_page);
    this.props.history.push({
      pathname: "/WebPhimClub/movie",
      search: "",
      state: {},
    });
    // console.log("display_last_page:", display_last_page);

    if (display_last_page > amount_page) display_last_page = amount_page;
    else display_last_page = this.state.amount_displayPage;
    // console.log("display_last_page:", display_last_page);
    // console.log();
    this.setState({
      search,
      amount_page_search: amount_page,
      check_search: true,
      display_page: 1,
      display_last_page,
    });
  };
  ////////////////////////////creat element//////////////////////////////////
  builtRowsPage = (display_last_page) => {
    const rows = [];
    let {
      display_first_page,
      display_page,
      amount_page_movies,
      amount_page_search,
      check_search,
    } = this.state;
    // let { display_first_page, display_last_page, display_page } = this.state;
    let amount_page = check_search ? amount_page_search : amount_page_movies;
    if (
      (display_page < display_first_page) |
      (display_page > display_last_page)
    )
      this.handlePageTransition("clickpage", display_page, null);
    if (display_last_page > amount_page) display_last_page = amount_page;

    // console.log("object");
    // console.log(display_last_page);
    // console.log(amount_page);
    // console.log(this.state);
    for (let i = display_first_page; i <= display_last_page; i++) {
      rows[i] = (
        <div
          className="pagenum noselect"
          key={i}
          onClick={() => this.handlePageTransition("clickpage", i)}
          style={{
            backgroundColor: i === display_page ? "black" : "white",
            color: i === display_page ? "white" : "black",
          }}
        >
          <span> {i}</span>
        </div>
      );
    }
    return rows;
  };

  createGenresMovie = () => {
    let genres_arr = [];
    let { genres, filter } = this.state;
    for (let e in genres) {
      genres_arr[genres_arr.length] = (
        <span
          key={genres_arr.length}
          onClick={() => {
            let indexofelement = filter.genres.indexOf(e);
            if (indexofelement === -1) filter.genres[filter.genres.length] = e;
            else filter.genres.splice(indexofelement, 1);
            this.setState({ filter });
            console.log(filter.genres);
          }}
          className="noselect"
          style={
            filter.genres.indexOf(e) !== -1
              ? { backgroundColor: "black", color: "white" }
              : { backgroundColor: "white", color: "black" }
          }
        >
          {genres[e]}
        </span>
      );
    }
    return genres_arr;
  };

  render() {
    let {
      amount_page_movies,
      amount_page_search,
      amount_movie_page,
      search,
      movies,
      check_search,
      keywords,
      genres_search,
      release_year,
      genres,
      display_page,
      value_page_goto,
      location,
      sort,
      filter,
      search_movie_disabled,
      display_last_page,
    } = this.state;
    let display_page_movie = [];
    let amount_page = check_search ? amount_page_search : amount_page_movies;
    if (check_search)
      display_page_movie = search.slice(
        amount_movie_page * (display_page - 1),
        amount_movie_page * display_page
      );
    else
      display_page_movie = movies.slice(
        amount_movie_page * (display_page - 1),
        amount_movie_page * display_page
      );
    // console.log(this.props.handleDisplayFilm);
    // this.props.handleDisplayFilm(display_page_movie);
    return (
      <div className="movie">
        <div className="movie-tool">
          <div className="movie-tool-sort">
            <div
              className="movie-tool-sort-label"
              onClick={() => {
                sort.sort_open = !sort.sort_open;
                this.setState({ sort: sort });
              }}
            >
              <span>Sort </span>
              {sort.sort_open ? <IoIosArrowForward /> : <IoIosArrowDown />}
            </div>
            <div
              className="movie-tool-sort-tool"
              style={{ display: sort.sort_open ? "inline-block" : "none" }}
            >
              <div className="movie-tool-sort-devide"></div>
              <label>
                Sort results by
                <select
                  value={sort.sort_result}
                  onChange={(e) => {
                    sort.sort_result = e.target.value;
                    this.setState({ sort: sort, search_movie_disabled: true });
                  }}
                >
                  <option value="">Sort by</option>
                  {sortValue.map((e, i) => (
                    <option value={e} key={i}>
                      {e}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <div className="movie-tool-sort noselect">
            <div
              className="movie-tool-sort-label "
              onClick={() => {
                filter.filter_open = !filter.filter_open;
                this.setState({ filter: filter });
              }}
            >
              <span>Filters </span>
              {filter.filter_open ? <IoIosArrowForward /> : <IoIosArrowDown />}
            </div>
            <div
              className="movie-tool-sort-tool"
              style={{ display: filter.filter_open ? "inline-block" : "none" }}
            >
              <div className="movie-tool-sort-devide"></div>
              <label>
                <div>Release Years</div>
                <select
                  value={filter.year}
                  onChange={(e) => {
                    filter.year = e.target.value;
                    this.setState({
                      filter: filter,
                      search_movie_disabled: true,
                    });
                  }}
                >
                  <option value="">Choose year</option>
                  {release_year.map((e, i) => (
                    <option value={e} key={i}>
                      {e}
                    </option>
                  ))}
                </select>
              </label>
              <div className="movie-tool-sort-devide"></div>

              <label>
                <div>Genres</div>
                <div className="genres">{this.createGenresMovie()}</div>
              </label>
            </div>
          </div>
          <button
            disabled={
              search_movie_disabled || filter.genres.length !== 0 ? false : true
            }
            onClick={this.handleClickFilterButton}
          >
            Search
          </button>
        </div>
        <div className="movie-display">
          {amount_page === 0 ? (
            <div>No results for search</div>
          ) : (
            <div>
              <div className="movie-display-pagenum">
                {display_last_page > amount_page
                  ? this.builtRowsPage(amount_page)
                  : this.builtRowsPage(display_last_page)}
                <div
                  className="nextpage noselect"
                  onClick={() => this.handlePageTransition("nextpage")}
                >
                  Next
                  <GiNextButton style={{ fontSize: "12px" }} />
                </div>
                <form
                  className="gotopage"
                  onSubmit={(e) => {
                    this.handlePageTransition("gotopage", null, e);
                  }}
                >
                  <input
                    type="number"
                    placeholder={amount_page}
                    min="1"
                    max={amount_page}
                    onChange={this.handleChangeInputGoto}
                  ></input>
                  <button className="noselect">Go</button>
                </form>
              </div>
              <div className="movie-display-film">
                {display_page_movie.map((el, i) => {
                  let { id, poster_path, vote_average, title, release_date } =
                    el;
                  let part_link = id + "-" + title.replace(/\s/g, "-");
                  return (
                    <div className="movieBanner col-6 col-mo-12" key={i}>
                      <Link
                        to={"/webFilmClub/movie/" + part_link}
                        key={i}
                        className="link-decoration"
                        // onClick={() => {
                        //   console.log(el);
                        //   this.props.handleDisplayFilm(el);
                        // }}
                      >
                        <div className="movieBanner-image">
                          <img src={poster_path} alt={title}></img>
                          <div className="wrap-circleProcessBar">
                            <CircleProcessBar percent={vote_average * 10} />
                          </div>
                        </div>
                        <div className="movieBanner-averRate"></div>
                        <div className="movieBanner-title">
                          <h4>{title}</h4>
                          <h5>{release_date}</h5>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
              <div className="movie-display-pagenum">
                {display_last_page > amount_page
                  ? this.builtRowsPage(amount_page)
                  : this.builtRowsPage(display_last_page)}
                <div
                  className="nextpage noselect"
                  onClick={() => this.handlePageTransition("nextpage")}
                >
                  Next
                  <GiNextButton style={{ fontSize: "12px" }} />
                </div>
                <form
                  className="gotopage"
                  onSubmit={(e) => {
                    this.handlePageTransition("gotopage", null, e);
                  }}
                >
                  <input
                    type="number"
                    placeholder={amount_page}
                    min="1"
                    max={amount_page}
                    onChange={this.handleChangeInputGoto}
                  ></input>
                  <button className="noselect">Go</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export class Film extends Component {
  render() {
    return (
      <div class="film">
        <div>test</div>
      </div>
    );
  }
}
/////////////////////////////////////////////////colection page///////////////////////////////////////////
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
