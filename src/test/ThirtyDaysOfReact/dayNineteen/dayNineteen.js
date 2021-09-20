import React, { Component } from "react";
// import { number } from "yargs";
// import { GiCat } from "react-icon";
import sleepCat from "../../../images/sleepCat.gif";
import loading from "../../../images/loading.gif";

let datafet = [];

export default class DayNineteen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   test: 1,
      dataState: [
        {
          name: "",
          origin: "",
          url: "",
          temperament: "",
          life_span: "",
          weight: "",
          description: "",
        },
      ],
      originArr: [],
      counter: {},
      classify: "All",
      averWeight: 0,
      averLifeSpan: 0,
      loading: false,
    };
  }
  componentDidMount() {
    this.fetchCountryData();
  }

  fetchCountryData = async () => {
    const url = "https://api.thecatapi.com/v1/breeds";
    try {
      const response = await fetch(url);
      datafet = await response.json();
      console.log(datafet);
      let originArr = [];
      let counter = {};
      let dataState = [];
      let weightSum = 0,
        lifespanSum = 0;
      let counterWeight = 0,
        counterLSpan = 0;
      let averLifeSpan = 0,
        averWeight = 0;
      datafet.map((catDatafet) => {
        // console.log(catDatafet.image);
        if (catDatafet.image) {
          //   console.log("object");
          let {
            name,
            origin,
            image: { url },
            temperament,
            life_span,
            weight: { metric },
            description,
          } = catDatafet;
          //   let index = originArr.findIndex(origin);
          if (!originArr.includes(origin)) {
            originArr.push(origin);
            counter[origin] = 1;
          } else {
            counter[origin]++;
          }
          //   let { weight: metric } = weighttp;
          dataState.push({
            name,
            origin,
            url,
            temperament,
            life_span,
            metric,
            description,
          });
          //   console.log(dataState);
          //   console.log(originArr);
          //   console.log(url);
          let [x, y] = metric.split(" - ");
          weightSum += (Number(x) + Number(y)) / 2;
          counterWeight++;
          console.log(weightSum, counterWeight);
          let [m, n] = life_span.split(" - ");
          lifespanSum += (Number(m) + Number(n)) / 2;
          counterLSpan++;
          console.log(lifespanSum, counterLSpan);
        } else {
          let {
            name,
            origin,
            temperament,
            life_span,
            weight: { metric },
            description,
          } = catDatafet;
          if (!originArr.includes(origin)) {
            originArr.push(origin);
            counter[origin] = 1;
          } else {
            counter[origin]++;
          }
          dataState.push({
            name,
            origin,
            url: "none",
            temperament,
            life_span,
            metric,
            description,
          });
          let [x, y] = metric.split(" - ");
          weightSum += (Number(x) + Number(y)) / 2;
          counterWeight++;
          console.log(weightSum, counterWeight);
          let [m, n] = life_span.split(" - ");
          lifespanSum += (Number(m) + Number(n)) / 2;
          counterLSpan++;
          console.log(lifespanSum, counterLSpan);
        }
        return 0;
      });
      originArr = originArr.sort();
      dataState = dataState.sort((a, b) => {
        let namea = a.name;
        let nameb = b.name;
        if (namea < nameb) return true;
        else return false;
      });
      console.log(originArr);
      console.log(dataState);
      averWeight = (
        Math.round((weightSum / counterWeight) * 100) / 100
      ).toFixed(2);
      averLifeSpan = (
        Math.round((lifespanSum / counterLSpan) * 100) / 100
      ).toFixed(2);
      console.log(averLifeSpan);
      console.log(averWeight);

      this.setState({
        dataState,
        originArr,
        counter,
        averLifeSpan,
        averWeight,
        loading: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleClickClassify = (event) => {
    console.log(event.target.getAttribute("name"));
    const classify = event.target.getAttribute("name");
    this.setState({
      classify,
    });
  };
  render() {
    const {
      dataState,
      originArr,
      classify,
      counter,
      averLifeSpan,
      averWeight,
    } = this.state;
    console.log(dataState);
    console.log(originArr);
    console.log(classify);
    return (
      <div className="perday19">
        {!this.state.loading ? (
          <div className="loading">
            <img src={loading} alt="loading....."></img>
          </div>
        ) : (
          <div>
            <div className="introduce">
              <img src={sleepCat} alt="loading...."></img>
              <h1>Cats Paradise</h1>
              <h2>
                There are <span>{datafet.length}</span> cat breads
              </h2>
              <small>
                On average a cat can weight <span>{averWeight}</span> kg and
                lives <span>{averLifeSpan} </span>
                years
              </small>
            </div>
            <div className="classifyOrigin">
              <small onClick={this.handleClickClassify} name="All">
                All
              </small>
              {originArr.map((origin, i) => (
                <small key={i} onClick={this.handleClickClassify} name={origin}>
                  {origin}({counter[origin]})
                </small>
              ))}
            </div>
            <div className="displayArea">
              {dataState.map((catData, i) => {
                let {
                  name,
                  origin,
                  url,
                  temperament,
                  life_span,
                  metric,
                  description,
                } = catData;
                // console.log(weight);
                let altStr = name + " cat from " + origin;
                if (classify === "All" || origin === classify)
                  return (
                    <div className="displayArea-cat" key={i}>
                      <div className="displayArea-cat-picture">
                        {url === "none" ? (
                          <div></div>
                        ) : (
                          <img src={url} alt={altStr}></img>
                        )}
                      </div>
                      <div className="displayArea-cat-desc">
                        <span>{name}</span>
                        <h3>{origin}</h3>
                        <div>
                          <small>Temperament: </small>
                          <span>{temperament}</span>
                        </div>
                        <div>
                          <small>Life Span: </small>
                          <span>{life_span} years</span>
                        </div>
                        <div>
                          <small>Weight:</small>
                          <span> {metric} kg</span>
                        </div>
                        <div>
                          <small>Description: </small>
                          <span>{description}</span>
                        </div>
                      </div>
                    </div>
                  );
                else return <div></div>;
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}
