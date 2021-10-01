import "./App.css";
import "./reset.css";
import React, { Component } from "react";
import ReactDOM from "react-dom";
// import * as colectionIDs from "./test.json";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
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
// import { BsCollectionPlayFill } from "react-icons/bs";
import { Home, Collection, FAQ } from "./contentApp";
///////////////////////////////////////////////////import library function
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";

// D:\my work\web dev\javascript\reactjs\My_project\offline\WebPhimClub\public\icon_head.png

export default class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className="app">
        <Router>
          <HeaderApp />
          <ContentApp />
        </Router>
        {/* <FooterApp /> */}
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
              to="/"
              name="home"
              className="header-bar-link link-decoration"
            >
              <img src={Logo} alt="logo web" className="home"></img>
            </Link>
            <Link to="/movie" className="header-bar-link link-decoration">
              <span className="header-bar-text ">Movie</span>
            </Link>
            <Link to="/collection" className="header-bar-link link-decoration">
              <span className="header-bar-text ">Collection</span>
            </Link>
            <Link to="/FAQ" className="header-bar-link link-decoration">
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
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/collection">
            <Collection />
          </Route>
          <Route path="FAQ">
            <FAQ />
          </Route>
        </Switch>
      </div>
    );
  }
}
