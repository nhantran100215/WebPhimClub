import React, { Component } from "react";
import Axios from "axios";
// import FileDownload from "js-file-download";
const pako = require("pako");

export default class GetAPI extends Component {
  componentDidMount() {
    Axios({
      method: "get",
      url: " http://files.tmdb.org/p/exports/movie_ids_23_09_2021.json.gz",
      responseType: "arraybuffer",
    }).then(function (response) {
      console.log(pako.ungzip(response.data, { to: "string" }));
    });
  }
  // Getdata = async (i) => {
  //   let url =
  //     "https://api.themoviedb.org/3/movie/" +
  //     i +
  //     "?api_key=d1ac13b85f1d54e58edbe4543ffee597";
  //   console.log(i);
  //   try {
  //     const response = await fetch(url);
  //     let datafet1 = await response.json();
  //     //   let datafet1 = JSON.parse(datafet);
  //     let { success, release_date } = datafet1;
  //     console.log(success, i);
  //     console.log(release_date, i);
  //     //   console.log(datafet["release_date"], i);
  //     //   console.log(datafet["adult"], i);
  //     if (success !== false) console.log(datafet1, i);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  render() {
    return (
      <div>
        <p>test</p>
      </div>
    );
  }
}
