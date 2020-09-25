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

  setData = (callback) => {};

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
      </div>
    );
  }
}

export default Gistogram;
