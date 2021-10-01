import React, { Component } from "react";

export class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="home-backdrop">
          <form className="home-backdrop-search">
            <input type="text" placeholder="Search for movie..."></input>
            <button>Search</button>
          </form>
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
