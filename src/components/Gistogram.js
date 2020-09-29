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
      const K = Math.ceil(1 + 3.2 * Math.log10(inputData.length));
      const deltaT = Math.ceil(
        (Math.max(...inputData) - Math.min(...inputData)) / K
      );
      const centerT = (Math.min(...inputData) + Math.max(...inputData)) / 2;
      const chunks = this.props.countArr.chunk(K);
      console.log(K);
      console.log(deltaT);
      console.log(centerT);
      console.log(chunks);
    }
  };

  buildGraph = () => {
    return new Dygraph(this.graphRef.current, this.state.string, this.config);
  };

  componentDidMount() {
    this.setData(this.buildGraph);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setData(this.buildGraph);
    }
  }

  render() {
    return (
      <div className="gistogram">
        <h4 className="heading">Гістограма вибірки</h4>
      </div>
    );
  }
}

export default Gistogram;
