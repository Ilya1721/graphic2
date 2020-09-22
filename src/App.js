import React from "react";
import "./css/main.css";

import Input from "./components/Input";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      N: undefined,
      InputData: [],
    };
  }

  setInput = (N, InputData) => {
    this.setState(
      {
        ...this.state,
        N,
        InputData,
      },
      () => {
        console.log(this.state);
      }
    );
  };

  render() {
    return (
      <div className="app">
        <Input setInput={this.setInput} />
      </div>
    );
  }
}

export default App;
