import React from "react";
import "./css/main.css";

import Input from "./components/Input";
import DataTable from "./components/DataTable";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      N: undefined,
      InputData: [],
    };
  }

  componentDidMount() {
    console.log(this.state.inputData);
  }

  setInput = (N, InputData) => {
    if (N === InputData.length) {
      this.setState(
        {
          ...this.state,
          N,
          InputData,
        },
        () => {
          console.log(this.state.InputData);
        }
      );
    } else {
      alert("N не дорівнює кількості чисел отриманих з файла");
    }
  };

  render() {
    return (
      <div className="app">
        <Input setInput={this.setInput} />
        <DataTable
          data={{ N: this.state.N, inputData: this.state.InputData }}
        />
      </div>
    );
  }
}

export default App;
