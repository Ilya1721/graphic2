import React from "react";
import "./css/main.css";

import Input from "./components/Input";
import DataTable from "./components/DataTable";
import NumberCountGraph from "./components/NumberCountGraph";
import Gistogram from "./components/Gistogram";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      N: undefined,
      inputData: new Array(203).fill(0),
      countArr: [],
    };
  }

  setInput = (N, inputData) => {
    if (N === inputData.length) {
      this.setState({
        ...this.state,
        N,
        inputData,
      });
    } else {
      alert("N не дорівнює кількості чисел отриманих з файла");
    }
  };

  setCountArr = (arr) => {
    if (arr.length > 0) {
      this.setState({
        ...this.state,
        countArr: arr,
      });
    } else {
      alert("Count arr error! it is empty");
    }
  };

  render() {
    return (
      <div className="app">
        <Input setInput={this.setInput} />
        <DataTable inputData={this.state.inputData} />
        <NumberCountGraph
          setCountArr={this.setCountArr}
          inputData={this.state.inputData}
        />
        <Gistogram
          countArr={this.state.countArr}
          inputData={this.state.inputData}
        />
      </div>
    );
  }
}

export default App;
