import "./tool.css";
import { useState, useEffect, Component } from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

export class CircleProcessBar extends Component {
  render() {
    let { percent } = this.props;
    let rotate = { left: "", right: "" };
    if (percent < 50) rotate.right = `rotate(${(percent * 180) / 50}deg)`;
    else {
      rotate.right = `rotate(180deg)`;
      rotate.left = `rotate(${((percent - 50) * 180) / 50}deg)`;
    }
    let border_color =
      percent < 34 ? "red" : percent < 67 ? "yellow" : "#20bd6f";
    return (
      <div className="circleProgressBar">
        <div className="circleProgressBar-outside">
          <div className="circleProgressBar-outside-right">
            <div
              className="circleProgressBar-outside-right-run "
              style={{
                transform: rotate.right,
                "--border-color": border_color,
              }}
            ></div>
          </div>
          <div className="circleProgressBar-outside-left">
            <div
              className="circleProgressBar-outside-left-run"
              style={{ transform: rotate.left, "--border-color": border_color }}
            ></div>
          </div>
        </div>
        <div className="circleProgressBar-inner">{this.props.percent}%</div>
      </div>
    );
  }
}
