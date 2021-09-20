// import logo from "./logo.svg";
import "./App.css";
import "./reset.css";
// import InvidualInfo from "./test/ThirtyDaysOfReact/day4/invidualInfo";
import React, { Component, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useParams,
  // useRouteMatch,
  // useParams,
} from "react-router-dom";
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaReact,
  FaBackward,
  FaForward,
} from "react-icons/fa";
// import { GrFormPrevious, GrFormNext } from "react-icons/gr";

// import { IconContext } from "react-icons";
import { GoArrowUp } from "react-icons/go";
import DayNineteen from "./test/ThirtyDaysOfReact/dayNineteen/dayNineteen";

let home30DaysArr = [
  [
    "Day 1111:",
    "JavaScript Refresher",
    "Work on your JavaScript before you start React",
  ],
  ["Day 2:", "Introduction to React", "Build some UI using JSX"],
  [
    "Day 3:",
    "JSX and Rendering JSX",
    "Work on your JavaScript before you start React",
  ],
  [
    "Day 4:",
    "Functional Components",
    "Work on your JavaScript before you start React",
  ],
  [
    "Day 5:",
    "Props in Functional Components",
    "Work on your JavaScript before you start React",
  ],
  ["Day 6:", "Mapping List", "Work on your JavaScript before you start React"],
  [
    "Day 7:",
    "Class Based Components",
    "Work on your JavaScript before you start React",
  ],
  ["Day 8:", "State", "Work on your JavaScript before you start React"],
  ["Day 9:", "Conditional Rendering", "It will be included"],
  ["Day 10:", "Folder Structure", "No specific project for this day"],
  [
    "Day 11:",
    "Event Handling",
    "Work on your JavaScript before you start React",
  ],
  ["Day 12:", "React Form", "Work on your JavaScript before you start React"],
  [
    "Day 13:",
    "Uncontrolled Input",
    "Work on your JavaScript before you start React",
  ],
  ["Day 14:", "React ComponentLife Cycles", ""],
  ["Day 15:", "Third Party packages", ""],
  ["Day 16:", "Higher Order Components", ""],
  ["Day 17:", "React Router", ""],
  ["Day 18:", "Fetching Data from Cat API", ""],
  ["Day 19:", "Fetching API:Part 1", ""],
  ["Day 20:", "Fetching API:Part 1", ""],
  ["Day 21:", "React Hooks", ""],
  ["Day 22:", "React Forum using Hooks", ""],
  ["Day 23:", "Fetching Data Using Hooks", ""],
  ["Day 24:", "Projects", ""],
  ["Day 25:", "Custom Hooks", ""],
  ["Day 26:", "React Context", ""],
  ["Day 27:", "Generating Hexadecimal Color", ""],
  ["Day 28:", "Twitter Clone(Old Twitter)", ""],
  [
    "Day 29:",
    "Explore different packages",
    "Try to explore different packages",
  ],
  [
    "Day 30:",
    "Congratulations",
    "Congratulations for completing the challenge! Time to celebrate your success!",
  ],
];

// let aboutHead=[['INTRODUCTION','30 Days Of React challenge is a step by step guide to learn React. Students will have a chance to learn how React works, work on exercises and build different applications. In addition, this challenge induce students to write a clean JavaScript code. By the end of the challenge, students can claim for certificate. Students will develop different complicated applications which can prepare them for a Junior Software developer role.In 30 Days of React challenge, students will learn:'],['REACT','React is a JavaScript library for building a reusable user interface(UI).'],['NECESSARY PACKAGES TO BUILD THIS APPLICATION:',''],[]]

let aboutIntroQues = [
  "What is React?",
  "JSX Elements",
  "Rendering JSX Elements",
  "Injecting data to JSX elements",
  "Style and className",
  "Components",
  "Functional Components",
  "Props",
  "Class-based Components",
  "States",
  "Event",
  "Form",
  "Conditional Rendering",
  "Controlled and Uncontrolled Input",
  "Component Life Cycle",
  "React Router",
  "React Hooks",
];

function App() {
  return (
    <div className="App">
      <Router>
        <HeaderApp />
        <MainApp />
      </Router>
      <FooterApp />
    </div>
  );
}

export default App;

class HeaderApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      home: "4px solid #61dbfb",
      about: "4px solid transparent",
      dummyData: "4px solid transparent",
    };
  }
  handleOnClick = (event) => {
    let name = event.target.getAttribute("name");
    // console.log(event.target.getAttribute("name"));
    for (let property in this.state) {
      if (property === name) {
        this.setState({
          [name]: "4px solid #61dbfb",
        });
      } else {
        this.setState({
          [property]: "4px solid transparent",
        });
      }
    }
    // console.log(this.state);
  };
  render() {
    return (
      <header>
        <h1>30 DAYS OF REACT</h1>
        <nav>
          <ul>
            <li
              style={{
                borderBottom: this.state.home,
              }}
              onClick={this.handleOnClick}
              name="home"
            >
              <Link to="/" name="home">
                <small name="home">HOME</small>
              </Link>
            </li>
            <li
              style={{
                borderBottom: this.state.about,
              }}
              onClick={this.handleOnClick}
              name="about"
            >
              <Link to="/about">
                <small name="about">ABOUT</small>
              </Link>
            </li>
            <li
              style={{
                borderBottom: this.state.dummyData,
              }}
              onClick={this.handleOnClick}
              name="dummyData"
            >
              <Link to="/dummyData">
                <small name="dummyData">DUMMY DATA</small>
              </Link>
            </li>
          </ul>
          {/* <Link to="/day/19">
            <small name="day 19">Day 19</small>
          </Link> */}
        </nav>
      </header>
    );
  }
}

const FooterApp = () => {
  return (
    <div className="footer">
      <div className="text">
        <h4>30 Days Of React</h4>
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

class MainApp extends Component {
  MainHandleOnClick = () => {
    window.scrollTo(0, 0);
  };
  render() {
    return (
      <div className="main">
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/dummyData" component={DummyData} />
          <Route path="/day/:date" component={Day} />
          <Route path="/" component={Home} />
        </Switch>
        <button className="main-goHome" onClick={this.MainHandleOnClick}>
          <GoArrowUp className="main-goHome-icon" />
        </button>
      </div>
    );
  }
}

class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="content">
          <div className="getstarted day">
            <h1 className="center">Learn React by building Applications</h1>
            <div className="day-content">
              <small>
                30 Days Of React is a step by step guide to learn React.js. It
                is structured based on days and the challenge goes form day 1 to
                30. In the 30 Days Of React challenge , you will have a chance
                to practice with small exercises, solve different challenging
                problems and build more than 30 simple and complex applications.
                By the end of the challenge, your JavaScript and React and
                problem-solving skill will reach to a higher level. There are
                also{" "}
                <a
                  href="https://github.com/Asabeneh/30-Days-Of-JavaScript"
                  alt="30-Days-Of-JavaScript"
                  target="_blank"
                  rel="noreferrer"
                >
                  30 Days Of JavaScript
                </a>
                and
                <a
                  href="https://github.com/Asabeneh/30-Days-Of-Python"
                  alt="30-Days-Of-Python"
                  target="_blank"
                  rel="noreferrer"
                >
                  30 Days Of Python
                </a>
              </small>
              <img
                src="./images/avatar30daysHomepage.jpg"
                alt="vatar 30days course"
              ></img>
            </div>
            <a
              href="https://github.com/Asabeneh/30-Days-Of-React"
              alt="30-Days-Of-React"
              target="_blank"
              rel="noreferrer"
            >
              GET STARTED
            </a>
          </div>

          {/* <Router>
            <Link to="/about">
              <small name="home">About</small>
            </Link>
            <Switch>
              <Route path="/about" component={About} />
            </Switch>
          </Router> */}

          <div className="day">
            <h1 className="center">30 DAYS OF REACT PROJECTS</h1>
          </div>

          {home30DaysArr.map(([ele1, ele2, ele3], i) => {
            return (
              <Link to={"/day/" + (i + 1)} key={i} className="link-decoration">
                <div className="day">
                  <h1>
                    {ele1} {ele2}
                  </h1>
                  <div className="day-content">
                    <p>{ele3}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="reference"></div>
      </div>
    );
  }
}
class About extends Component {
  render() {
    return (
      <div className="about">
        <h4 className="about-title">
          <a href="#introduce" className="link">
            #
          </a>
          Introduction
        </h4>
        <article id="Introduction">
          30 Days Of React challenge is a step by step guide to learn React.
          Students will have a chance to learn how React works, work on
          exercises and build different applications. In addition, this
          challenge induce students to write a clean JavaScript code. By the end
          of the challenge, students can claim for certificate. Students will
          develop different complicated applications which can prepare them for
          a Junior Software developer role.In 30 Days of React challenge,
          students will learn:
        </article>
        {aboutIntroQues.map((ele, i) => (
          <div key={i}>
            <FaReact className="icon" />
            <article className="text">{ele}</article>
          </div>
        ))}

        <h4 className="about-title">
          <a href="#react" className="link">
            #
          </a>
          REACT
        </h4>
        <article id="react">
          React is a JavaScript library for building a reusable user
          interface(UI).
        </article>

        <h4 className="about-title">
          <a href="#necessary-package" className="link">
            #
          </a>
          NECESSARY PACKAGES TO BUILD THIS APPLICATION:
        </h4>
        <div className="necessary-package-content">
          <article
            id="necessary-package"
            className="necessary-package-content-code"
          >
            $ yarn add node-sass
          </article>
          <article id="" className="necessary-package-content-code">
            {" "}
            $ yarn add moment
          </article>
          <article id="" className="necessary-package-content-code">
            $ yarn add react-router-dom
          </article>
          <article id="" className="necessary-package-content-code">
            {" "}
            $ yarn add axios
          </article>
        </div>

        <h4 className="about-title">
          <a href="#check-out" className="link">
            #
          </a>
          CHECK OUT THE OFFICIAL WEBSITE TO LEARN MORE ABOUT REACT:
        </h4>
        <article id="check-out">React official website React</article>
      </div>
    );
  }
}
const DummyData = () => {
  return <h1>DummyData</h1>;
};

const Day = () => {
  let { date } = useParams();
  const [countDay, setCountDay] = useState(Number(date));
  // setCountDay({ countDay: date });
  const handeBackward = (e) => {
    let countDaytp = countDay;
    countDaytp--;
    if ((countDaytp > 0) & (countDaytp <= 30)) {
      setCountDay(countDaytp);
    }
  };
  const handeForward = (e) => {
    let countDaytp = countDay;
    countDaytp++;
    if ((countDaytp > 0) & (countDaytp <= 30)) {
      setCountDay(countDaytp);
    }
  };
  // let arr = [30];
  return (
    <div className="perday">
      <div className="perday-route">
        <div>
          <FaBackward
            className="perday-route-go"
            onClick={handeBackward}
            name="backward"
          />
        </div>
        <h3>Day {countDay}</h3>
        <div>
          <FaForward
            className="perday-route-go"
            onClick={handeForward}
            name="forward"
          />
        </div>
      </div>
      {countDay === 19 ? <DayNineteen /> : ""}
    </div>
  );
};
