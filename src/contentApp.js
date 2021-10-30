import React, { Component } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useParams,
  // browserHistory,
} from "react-router-dom";
import { CircleProcessBar, Loading } from "./lib/tool/tool";
import { GiNextButton } from "react-icons/gi";
import { FaPlayCircle } from "react-icons/fa";
import {
  AiOutlineUnorderedList,
  AiFillStar,
  AiOutlineClose,
  AiOutlineSearch,
} from "react-icons/ai";
import { MdFavorite } from "react-icons/md";
import { BsFillBookmarkFill } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { act } from "react-dom/test-utils";
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
      search_str: "",
      history: this.props.history,
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
    let { trendingDay, search_str, history } = this.state;
    let trending = [];
    trendingDay
      ? (trending = this.props.trending.week)
      : (trending = this.props.trending.day);
    let Today = this.state.width_trendingHeaderToday + "px";
    let Week = this.state.width_trendingHeaderWeek + "px";
    return (
      <div className="home noselect">
        <div className="home-backdrop">
          <div className="home-backdrop-header">
            <h1>Welcome My Page</h1>
            <h2>Thoudsands of movies to discover. Explore now.</h2>
          </div>
          <form
            className="home-backdrop-search"
            onSubmit={(event) => {
              const path = "/webFilmClub/search/";
              let arr_search_str = search_str.split(" ");
              let convert_search_str = "";
              arr_search_str.forEach((el, i) =>
                i === arr_search_str.length - 1
                  ? (convert_search_str = convert_search_str + el)
                  : (convert_search_str = convert_search_str + el + "-")
              );
              let path_searchSTR = "1?search=" + convert_search_str;
              if (search_str !== "") history.push(path + path_searchSTR);
              // this.props.close_SearchBoard();
              event.preventDefault();
            }}
          >
            <input
              type="text"
              placeholder="Search for movie..."
              onChange={(e) => this.setState({ search_str: e.target.value })}
            ></input>
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
          <div className="home-popular" style={{ margin: "20px" }}>
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
    // console.log("search");
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
      // keywords,
      // genres_search,
      release_year,
      // genres,
      display_page,
      // value_page_goto,
      // location,
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

    ////////////css/////////////

    return (
      <div className="movie noselect">
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
            <div className="noresult">
              No results for your search
              <AiOutlineSearch />
            </div>
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
                        //   // console.log(el);
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
  constructor(props) {
    super(props);
    this.state = {
      turnOn_trailer: false,
      trailer_link: "",
      movie: {},
      genres: this.props.genres,
      history: {
        location: {
          pathname: "",
        },
      },
      updateHistory_finish: true,
      hover_poster: false,
      similar_movie: [],
    };
  }
  componentDidMount() {
    // console.log("componentDidMount");
    document.addEventListener("keydown", this.pressKey, false);
    this.getSimilarMovies("props");
  }

  pressKey = (event) => {
    if (event.keyCode === 27) {
      //Do whatever when esc is pressed
      this.setState({ turnOn_trailer: false });
    }
  };

  getSimilarMovies = async (str) => {
    console.log("getSimilarMovies");
    // this.setState({ updateHistory_finish: false });
    // if(str==="props")?
    const { history } = this.props;
    console.log(history.location.pathname);
    // if (history.location.pathname !== "")
    //   if (window.location.pathname !== history.location.pathname)
    //     history.location.pathname = window.location.pathname;
    this.setState({ history });
    // let pathnameArr = history.location.pathname.split("/");
    // console.log(pathnameArr[pathnameArr.length]);
    const id = history.match.params.slug.split("-")[0];
    // const id = pathnameArr[pathnameArr.length]?.split("-")[0];
    const api_key = "d1ac13b85f1d54e58edbe4543ffee597";
    const url =
      "https://api.themoviedb.org/3/movie/" +
      id +
      "/similar?api_key=" +
      api_key +
      "&language=en-US&page=1";
    const url_movie =
      "https://api.themoviedb.org/3/movie/" +
      id +
      "?api_key=" +
      api_key +
      "&language=en-US";
    console.log(url);
    try {
      const response = await fetch(url);
      const datafet = await response.json();
      // console.log(datafet);
      let { similar_movie } = this.state;
      similar_movie.length = 0;
      datafet.results.forEach((el) => {
        let {
          backdrop_path,
          genre_ids,
          id,
          title,
          overview,
          popularity,
          poster_path,
          release_date,
          vote_average,
          vote_count,
        } = el;
        backdrop_path = "https://image.tmdb.org/t/p/w500" + backdrop_path;
        poster_path = "https://image.tmdb.org/t/p/w500" + poster_path;
        vote_average = Math.round(vote_average * 10) / 10;
        similar_movie[similar_movie.length] = {
          backdrop_path,
          genre_ids,
          id,
          title,
          overview,
          popularity,
          poster_path,
          release_date,
          vote_average,
          vote_count,
        };
      });
      // console.log(similar_movie);
      this.setState({ similar_movie });
      console.log(similar_movie);
    } catch (e) {
      console.log(e);
    }

    try {
      const response = await fetch(url_movie);
      const datafet = await response.json();
      // console.log(datafet);
      let {
        backdrop_path,
        genres,
        id,
        title,
        overview,
        popularity,
        poster_path,
        release_date,
        vote_average,
        vote_count,
      } = datafet;
      let { movie } = this.state;
      backdrop_path = "https://image.tmdb.org/t/p/w500" + backdrop_path;
      poster_path = "https://image.tmdb.org/t/p/w500" + poster_path;
      vote_average = Math.round(vote_average * 10) / 10;
      let genre_ids = genres;
      movie = {
        backdrop_path,
        genre_ids,
        id,
        title,
        overview,
        popularity,
        poster_path,
        release_date,
        vote_average,
        vote_count,
      };
      this.setState({ movie });
      console.log(movie);
    } catch (e) {
      console.log(e);
    }
  };

  getTrailerLink = async (film) => {
    // http://api.themoviedb.org/3/movie/871875/videos?api_key=d1ac13b85f1d54e58edbe4543ffee597
    // https://www.youtube.com/embed?v=SUXWAEX2jlg
    let { trailer_link } = this.state;
    let { id } = film;
    console.log(id);
    console.log("this.state.movies");
    console.log(film);
    const api_key = "d1ac13b85f1d54e58edbe4543ffee597";
    let url = "";
    url = id
      ? " http://api.themoviedb.org/3/movie/" +
        id +
        "/videos?api_key=" +
        api_key
      : "";
    console.log(url);
    try {
      const response = await fetch(url);
      const datafet = await response.json();
      console.log(datafet);
      let check_search_key = false;
      datafet.results.forEach((el) => {
        if (!check_search_key) {
          if (el.type === "Trailer") {
            trailer_link =
              "https://www.youtube.com/embed/" + el.key + "?autoplay=1&mute=0";
            console.log(trailer_link);
          }
        }
      });
    } catch (error) {
      console.error(error);
    }

    this.setState({ turnOn_trailer: true, trailer_link });
  };

  getAPIMovie = () => {
    // this.setState({ updateHistory_finish: false });
    // let { history } = this.state;
    // if (window.location.pathname !== history.location.pathname) {
    console.log("object");
    this.getSimilarMovies();
    window.scrollTo(80, 80);
    // } else {
    //   // this.setState({ updateHistory_finish: true });
    // }
    // return (
    //   <div>
    //     <Loading />
    //   </div>
    // );
  };

  render() {
    let {
      movie,
      history,
      genres,
      turnOn_trailer,
      hover_poster,
      trailer_link,
      similar_movie,
    } = this.state;

    let {
      id,
      genre_ids,
      media_type,
      overview,
      popularity,
      poster_path,
      backdrop_path,
      release_date,
      title,
      vote_average,
      vote_count,
    } = movie;

    console.log("vote_average");
    console.log(vote_average);
    return (
      <div>
        {window.location.pathname === history.location.pathname ? (
          <div className="film">
            <div
              className="film-own"
              style={{
                backgroundImage: `linear-gradient(
            to right,
            var(--BGC-backdropFilm-gradient),
            var(--BGC-backdropFilm-gradient)
          ),
          url(${backdrop_path})`,
                backgroundPosition: "center",
                backgroundColor: "var(--BGC-header)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <div className="film-own-intro">
                <div
                  className="poster"
                  onMouseOver={() => this.setState({ hover_poster: true })}
                  onMouseOut={() => this.setState({ hover_poster: false })}
                  onClick={() => this.getTrailerLink(movie)}
                >
                  <img src={poster_path} alt={"movie " + title}></img>
                  <div
                    className="poster-turnonTrailer"
                    style={{ display: hover_poster ? "block" : "none" }}
                  >
                    <FaPlayCircle className="poster-turnonTrailer-icon" />
                  </div>
                </div>
                <div className="info">
                  <h2>{title}</h2>
                  <p>
                    Release date: <span>{release_date}</span>
                  </p>
                  <p>
                    Genres:{" "}
                    {genre_ids?.map((el, i) =>
                      i + 1 < genre_ids.length ? (
                        <span key={i}>{el.name},</span>
                      ) : (
                        <span key={i}>{el.name}.</span>
                      )
                    )}
                  </p>
                  <div className="info-feature">
                    <CircleProcessBar
                      percent={vote_average * 10}
                      stylecss={{ "--width": "70px", "--height": "70px" }}
                    />
                    <h3 className="info-feature-item">User score</h3>
                    <div className="info-feature-item">
                      <AiOutlineUnorderedList />
                    </div>
                    <div className="info-feature-item">
                      <MdFavorite />
                    </div>
                    <div className="info-feature-item">
                      <BsFillBookmarkFill />
                    </div>
                    <div className="info-feature-item">
                      <AiFillStar />
                    </div>
                  </div>
                  <div className="info-overview">
                    <h2>Overview:</h2>
                    <p>{overview}</p>
                  </div>
                  <p>
                    Popularity: <span>{popularity}</span>{" "}
                  </p>
                </div>
                {turnOn_trailer ? (
                  <div
                    className="trailer noselect"
                    // style={{ display: turnOn_trailer ? "block" : "none" }}
                  >
                    {trailer_link ? (
                      <div className="trailer-videos">
                        <div className="trailer-videos-head">
                          <h2>Play Trailer</h2>
                          <div
                            className="trailer-videos-close"
                            onClick={() =>
                              this.setState({ turnOn_trailer: false })
                            }
                          >
                            <AiOutlineClose />
                          </div>
                        </div>
                        <iframe
                          src={trailer_link}
                          frameBorder="0"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                          title="video"
                          // className="trailer-videos"
                        />
                      </div>
                    ) : (
                      <div className="trailer-videos">
                        <div
                          className="trailer-videos-close"
                          onClick={() =>
                            this.setState({ turnOn_trailer: false })
                          }
                        >
                          <AiOutlineClose />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <h2 className="film-recommend-title">Recommend Movie</h2>
            <div className="film-recommend">
              {similar_movie.length > 0 ? (
                <div>
                  {similar_movie.map((el, i) => {
                    let { id, poster_path, release_date, title, vote_average } =
                      el;
                    let arr_title = title?.split(" ");
                    let title_url = "";
                    arr_title?.forEach(
                      (e) => (title_url = title_url + "-" + e)
                    );
                    let part_link = id + title_url;
                    // console.log(part_link);
                    return (
                      <div className="movieBannerH" key={i}>
                        <Link
                          to={"/webFilmClub/movie/" + part_link}
                          key={i}
                          className="link-decoration"
                          onClick={() =>
                            setTimeout(() => this.getAPIMovie(), 0)
                          }
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
              ) : (
                <div></div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <Loading />
          </div>
          // this.getAPIMovie()
        )}
      </div>
    );
  }
}

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: this.props.genres,
      release_year: this.props.release_year,
      movies: [],
      movies_length: 0,
      history: { location: {} },
      ///////////////////////////
      search_arr_props: [],
      search_arr: [],
      amount_displayFilm: 16,
      filter: {
        state: false,
        genres: [],
        release_year: 0,
      },
      wait: true,
      sort: {
        state: false,
        active: "",
      },
    };
  }

  componentDidMount() {
    this.setState({ history: this.props.history, movies: this.props.movies });
  }

  static getDerivedStateFromProps(props, state) {
    let { movies } = props;
    let { history, search_arr_props, search_arr, sort, filter } = state;

    /////filter movies array
    let arr_filter_keywords = props.history.location.search
      .replace("?search=", "")
      .split("-");
    console.log(props.history.location.search);
    console.log(history.location.search);
    console.log(arr_filter_keywords);
    let search_arr_temp = [];
    arr_filter_keywords.forEach((el, i) => {
      if (i === 0) {
        search_arr_temp = movies.filter((el2) => el2.title.includes(el));
      } else {
        search_arr_temp = search_arr_temp.filter((el2) =>
          el2.title.includes(el)
        );
      }
    });
    console.log("search_arr_temp");
    console.log(search_arr_temp);
    console.log(props.movies.length);
    console.log(state.movies_length);
    let search_arr_test = [...search_arr_temp];
    if (
      (props.history.location.search !== history.location.search) |
      (props.movies.length !== state.movies_length)
    ) {
      console.log("getDerivedStateFromProps");
      console.log(search_arr_test);
      search_arr.length = 0;
      sort.active = 0;
      filter.genres.length = 0;
      filter.release_year = 0;

      return {
        search_arr,
        sort,
        filter,
        search_arr_props: search_arr_test,
        history: props.history,
        movies_length: props.movies.length,
        amount_displayFilm: 16,
      };
    }
    // return { wait: true };
  }

  builtFilmOfMovies = (arr) => {
    let { wait, genres, amount_displayFilm } = this.state;
    return (
      <div>
        {arr.slice(0, amount_displayFilm).map((el, i) => {
          let {
            poster_path,
            overview,
            popularity,
            vote_average,
            genre_ids,
            title,
            id,
            backdrop_path,
            release_date,
          } = el;
          let link_part =
            "/webFilmClub/movie/" + id + "-" + title.replaceAll(" ", "-");
          // console.log(vote_average);
          return (
            <div
              className="display-movies-film"
              // key={i}
              style={{
                backgroundImage: `linear-gradient(
    to right,
    var(--BGC-backdropFilm-gradient),
    var(--BGC-backdropFilm-gradient)
  ),
  url(${backdrop_path})`,
                backgroundPosition: "center",
                backgroundColor: "var(--BGC-header)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <div className="poster noselect">
                <Link to={link_part}>
                  <img
                    src={poster_path}
                    alt={link_part}
                    onLoad={() => this.setState({ wait: false })}
                    style={{ display: !wait ? "block" : "none" }}
                  />
                  <div style={{ display: wait ? "block" : "none" }}>
                    <Loading />
                  </div>
                </Link>
              </div>
              <div className="intro">
                <h3>{title}</h3>
                <div>
                  <span className="overview">
                    <h4>Overview: </h4>
                    {overview}
                  </span>
                </div>
                <div>
                  <span>
                    <h4>Popularity: </h4>
                    {popularity}
                  </span>
                </div>
                <div>
                  <span>
                    <h4>Rate: </h4>
                    {vote_average}
                  </span>
                </div>
                <div>
                  <span className="overview">
                    <h4>Genres: </h4>
                    {genre_ids.map((el1) => genres[el1]).join(",")}
                  </span>
                </div>
                <div>
                  <span>
                    <h4>Year: </h4>
                    {release_date}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div className="display-page">
          <button
            onClick={() => {
              amount_displayFilm += 16;
              this.setState({ amount_displayFilm });
            }}
            style={{ opacity: amount_displayFilm < arr.length ? "1" : "0" }}
          >
            Load More...
          </button>
        </div>
      </div>
    );
  };

  builtFilterGenres = () => {
    let arr = [];
    let { genres, filter } = this.state;
    for (let el in genres) {
      arr[arr.length] = (
        <div
          onClick={(e) => {
            let index = filter.genres.indexOf(el);
            console.log(el);
            index === -1
              ? (filter.genres[filter.genres.length] = el)
              : filter.genres.splice(index, 1);
            console.log("filter.genres::::");
            console.log(filter.genres);
            this.setState({ filter });
            this.handleFilter("filter");
          }}
          key={arr.length}
          style={
            filter.genres.includes(el)
              ? { backgroundColor: "black", color: "white" }
              : { backgroundColor: "white", color: "black" }
          }
          // onMouseOver={}
          className="genres"
        >
          {genres[el]}
        </div>
      );
    }
    return arr;
  };

  handleFilter = (kind, active) => {
    // console.log(kind, active);
    let { search_arr, search_arr_props, filter, genres } = this.state;
    // console.log(search_arr);
    if (kind === "sort") {
      let { sort } = this.state;
      switch (active) {
        case sortValue[0]:
          search_arr = search_arr_props.sort((a, b) =>
            Number(a.popularity) > Number(b.popularity) ? -1 : 1
          );
          console.log(search_arr);
          this.setState({ search_arr });
          break;

        case sortValue[1]:
          search_arr = search_arr_props.sort((a, b) =>
            Number(a.popularity) > Number(b.popularity) ? 1 : -1
          );
          console.log(search_arr);
          this.setState({ search_arr });
          break;

        case sortValue[2]:
          search_arr = search_arr_props.sort((a, b) =>
            Number(a.vote_average) > Number(b.vote_average) ? -1 : 1
          );
          console.log(search_arr);
          this.setState({ search_arr });
          break;

        case sortValue[3]:
          search_arr = search_arr_props.sort((a, b) =>
            Number(a.vote_average) > Number(b.vote_average) ? 1 : -1
          );
          console.log(search_arr);
          this.setState({ search_arr });
          break;
        case sortValue[4]:
          search_arr = search_arr_props.sort((a, b) =>
            Number(a.popularity) > Number(b.popularity) ? -1 : 1
          );
          console.log(search_arr);
          this.setState({ search_arr });
          break;
        case sortValue[5]:
          search_arr = search_arr_props.sort((a, b) => {
            let a_year = a.release_date.split("-");
            let b_year = b.release_date.split("-");
            if (Number(a_year[a_year.length]) > Number(b_year[b_year.length]))
              return -1;
            else return 1;
          });
          console.log(search_arr);
          this.setState({ search_arr });
          break;
        case sortValue[6]:
          search_arr = search_arr_props.sort((a, b) => {
            let a_year = a.release_date.split("-");
            let b_year = b.release_date.split("-");
            if (Number(a_year[a_year.length]) > Number(b_year[b_year.length]))
              return 1;
            else return -1;
          });
          console.log(search_arr);
          this.setState({ search_arr });
          break;
        case sortValue[7]:
          search_arr = search_arr_props.sort((a, b) =>
            Number(a.popularity) > Number(b.popularity) ? -1 : 1
          );
          console.log(search_arr);
          this.setState({ search_arr });
          break;
        default:
          search_arr.length = 0;
          console.log(search_arr);
          this.setState({ search_arr });
          break;
      }
    }

    if (kind === "filter") {
      search_arr = [...search_arr_props];
      if (Number(filter.release_year) !== 0) {
        search_arr = search_arr.filter((el) =>
          el.release_date.includes(filter.release_year)
        );
      }
      if (filter.genres.length > 0) {
        console.log("filter genres");
        console.log(search_arr);
        console.log(filter);
        search_arr = search_arr.filter((el) => {
          let check_genres = false;
          // console.log(el.genre_ids);
          el.genre_ids.forEach((el2, j) => {
            console.log(el2);
            if (filter.genres.includes(el2.toString())) {
              console.log("object");
              check_genres = true;
            }
          });
          if (check_genres) return true;
          else return false;
        });
      }
      console.log(search_arr);
      this.setState({ search_arr });
    }
    // console.log(search_arr);
  };

  render() {
    let {
      movies,
      search_arr_props,
      sort,
      genres,
      history,
      wait,
      search_arr,
      filter,
      release_year,
      amount_displayFilm,
    } = this.state;
    console.log(amount_displayFilm);
    console.log(release_year);
    console.log(genres);
    console.log(sort.active);
    release_year = release_year.sort((el1, el2) => (el1 > el2 ? -1 : 1));
    return (
      <div>
        <div className="search noselect">
          <div className="tool">
            <div className="tool-sort">
              <div
                className="tool-sort-header"
                onClick={() =>
                  // let {state}
                  {
                    sort.state = !sort.state;
                    this.setState({ sort });
                  }
                }
              >
                <span>Sort</span>
                <IoIosArrowDown
                  style={{ display: sort.state ? "none" : "inline-block" }}
                />
                <IoIosArrowForward
                  style={{ display: sort.state ? "inline-block" : "none" }}
                />
              </div>
              <div
                className="devide"
                style={{ display: sort.state ? "block" : "none" }}
              ></div>
              <div
                className="tool-sort-content"
                style={{ display: sort.state ? "block" : "none" }}
              >
                <label>
                  Sort results by
                  <select
                    value={sort.active}
                    onChange={(e) => {
                      sort.active = e.target.value;
                      this.setState({ sort });
                      this.handleFilter("sort", e.target.value);
                    }}
                  >
                    <option value={0}>---Select----</option>
                    {sortValue.map((e, i) => (
                      <option value={e} key={i}>
                        {e}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
            <div className="tool-filter">
              <div
                className="tool-filter-header"
                onClick={() => {
                  filter.state = !filter.state;
                  this.setState({ filter });
                }}
              >
                <span>Filter</span>
                <IoIosArrowDown
                  style={{ display: filter.state ? "none" : "inline-block" }}
                />
                <IoIosArrowForward
                  style={{ display: filter.state ? "inline-block" : "none" }}
                />
              </div>
              <div
                className="devide"
                style={{ display: filter.state ? "block" : "none" }}
              ></div>
              <div
                className="tool-filter-content"
                style={{ display: filter.state ? "block" : "none" }}
              >
                <label>
                  Release Year
                  <select
                    value={filter.release_year}
                    onChange={(e) => {
                      filter.release_year = e.target.value;
                      this.setState({ filter });
                      this.handleFilter("filter", null);
                    }}
                  >
                    <option value={0} label={"Choose Year"}></option>
                    {release_year.map((el, i) => (
                      <option value={el} label={el} key={i}></option>
                    ))}
                  </select>
                </label>
                <div
                  className="devide"
                  style={{ display: filter.state ? "block" : "none" }}
                ></div>
                <label>Genres :{this.builtFilterGenres()}</label>
                <button
                  onClick={() => {
                    search_arr.length = 0;
                    sort.active = 0;
                    filter.genres.length = 0;
                    filter.release_year = 0;
                    this.setState({ search_arr, sort, filter });
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
          <div className="display">
            <div className="display-page noselect"></div>
            <div className="display-movies">
              {search_arr.length === 0
                ? this.builtFilmOfMovies(search_arr_props)
                : this.builtFilmOfMovies(search_arr)}
              <div
                className="display-noresult"
                style={{
                  display: search_arr_props.length === 0 ? "block" : "none",
                }}
              >
                <span>
                  No results for your search
                  <AiOutlineSearch />
                </span>
              </div>
            </div>
          </div>
        </div>
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
