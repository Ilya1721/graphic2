import React from "react";
import "./css/main.css";

import Input from "./components/Input";
import DataTable from "./components/DataTable";
import NumberCountGraph from "./components/NumberCountGraph";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      N: undefined,
      inputData: [],
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
      </div>
    );
  }
}

export default App;
