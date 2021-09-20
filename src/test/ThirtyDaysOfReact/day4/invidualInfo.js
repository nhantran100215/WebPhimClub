import React from "react";
import dayFour from "../../../images/dayFour.jpg";

let arrSkill = [
  "HTML",
  "CSS",
  "Sass",
  "JS",
  "React",
  "Redux",
  "Node",
  "MongoDB",
  "Python",
  "Flask",
  "Dianjo",
  "NumPy",
  "Pandas",
  "Data Analysis",
  "MySQL",
  "GraphQL",
  "D3.js",
  "Gatsby",
  "Docker",
  "Heroku",
  "git",
];
const join = "joined on";

const firstName = "Nhan";
const lastName = "Tran";
const job = "Fresher Developer";
const office = "Le Thanh apartment";
class InvidualInfo extends React.Component {
  render() {
    return (
      <div className="invidual_info">
        <img
          src={dayFour}
          alt="the_river_between_the_hillsImage image"
          className="avatar"
        ></img>
        <h3 className="header">
          {firstName} {lastName}
        </h3>
        <span>
          {job}, {office}{" "}
        </span>
      </div>
    );
  }
}

class SkillInfo extends React.Component {
  render() {
    return (
      <div className="invidualSkills">
        <h3>SKILLS</h3>
        <div>
          {arrSkill.map((x, i) => (
            <span key={i}>{x}</span>
          ))}
        </div>
      </div>
    );
  }
}

let today = new Date();
const footer = (
  <footer>
    <i className="far fa-clock"></i>
    <span>
      {join}{" "}
      {today.getUTCMonth() +
        1 +
        " " +
        today.getUTCDate() +
        " " +
        today.getUTCFullYear()}{" "}
    </span>
  </footer>
);

const page = () => {
  return (
    <div className="page">
      <InvidualInfo />
      <SkillInfo />
      {footer}
    </div>
  );
};
export default page;
