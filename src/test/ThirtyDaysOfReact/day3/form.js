import React from "react";
export default class SubscribeTest extends React.Component {
  render() {
    return (
      <div className="subscribe-wrap">
        <h1>SUBSCRIBE</h1>
        <p>Sign up with your email address to recieve news and updates</p>
        <form>
          <div className="fillField">
            <input
              type="text"
              className="firstName"
              placeholder="First name"
            ></input>
            <input
              type="text"
              className="lateName"
              placeholder="Last name"
            ></input>
            <input
              type="email"
              className="email"
              name="email"
              placeholder="Email"
            ></input>
          </div>
          <input type="submit" className="submit" value="Subscribe" />
        </form>
      </div>
    );
  }
}
