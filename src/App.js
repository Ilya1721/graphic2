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

  render() {
    return (
      <div className="app">
        <Input setInput={this.setInput} />
        <DataTable inputData={this.state.inputData} />
        <NumberCountGraph inputData={this.state.inputData} />
        <Gistogram inputData={this.state.inputData} />
      </div>
    );
  }
}

export default App;
