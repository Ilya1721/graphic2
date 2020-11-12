import React from "react";
import Dygraph from "dygraphs";

import { graphConfig } from "../resources/config";

class Gistogram extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      string: "",
    };
    this.graphRef = React.createRef();
    this.config = graphConfig;
  }

  setData = (callback) => {
    const inputData = this.props.inputData;
    if (inputData.length > 0) {
      const K = Math.ceil(1 + 3.322 * Math.log10(inputData.length));
      const N = inputData.length;
      const inputMin = Math.min(...inputData);
      const inputMax = Math.max(...inputData);
      const deltaT = Math.ceil((inputMax - inputMin) / K);
      let localMin = inputMin;
      let table = [];
      let string = "x, w\n";
      for (let i = 0; i < K; i++) {
        const localMax = localMin + deltaT;
        const middle = (localMin + localMax) / 2;
        const count = this.countFreq(inputData, localMin, localMax);
        const relCount = count / N;
        const interval = [localMin, localMax];
        const chunk = this.getChunk(inputData, localMin, localMax);
        table.push({
          interval: interval,
          middle: middle,
          count: count,
          relCount: relCount,
          chunk: chunk,
        });
        string += `${interval[0]}, ${0}\n`;
        string += `${interval[0]}, ${relCount}\n`;
        string += `${interval[1]}, ${relCount}\n`;
        string += `${interval[1]}, ${0}\n`;
        localMin += deltaT;
      }
      this.props.setTable(table);
      this.setState(
        {
          string: string,
        },
        callback
      );
    }
  };

  countFreq = (arr, min, max) => {
    let count = 0;
    arr.forEach((i) => {
      if (i >= min && i < max) {
        count++;
      }
    });

    return count;
  };

  getChunk = (arr, min, max) => {
    let chunk = [];
    arr.forEach((i) => {
      if (i >= min && i < max) {
        chunk.push(i);
      }
    });

    return chunk;
  };

  buildGraph = () => {
    return new Dygraph(this.graphRef.current, this.state.string, this.config);
  };

  componentDidMount() {
    this.setData(this.buildGraph);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.inputData !== this.props.inputData) {
      this.setData(this.buildGraph);
    }
  }

  render() {
    return (
      <div className="gistogram">
        <h4 className="heading">Гістограма вибірки</h4>
        <div className="graph" ref={this.graphRef}></div>
      </div>
    );
  }
}

export default Gistogram;
