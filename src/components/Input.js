import React from "react";
import strings from "../resources/strings";

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      fileInput: [],
    };
    this.fileInput = React.createRef();
    this.fileReader = null;
  }

  parseFile = (e) => {
    const content = this.fileReader.result;
    const array = content.split(/\n| |,/).map((x) => parseInt(x, 10));
    this.setState(
      {
        ...this.state,
        fileInput: array,
      },
      () => {
        this.props.setInput(parseFloat(this.state.input), this.state.fileInput);
      }
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const file = this.fileInput.current.files[0];

    if (this.checkN() && file !== undefined) {
      this.fileReader = new FileReader();
      this.fileReader.onload = this.parseFile;
      this.fileReader.readAsText(file);
    } else if (file === undefined) {
      alert("Ви не ввели файл або ввели некоректний файл");
    } else {
      alert("Некоректне N");
    }
  };

  onChange = (e) => {
    this.setState({
      ...this.state,
      input: e.target.value,
    });
  };

  checkN = () => {
    return parseFloat(this.state.input.match(/^-?\d*(\.\d+)?$/)) > 0;
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="input">
        <div className="form-input">
          <label htmlFor="count" className="countLabel">
            {strings.N}
          </label>
          <input
            onChange={this.onChange}
            value={this.state.input}
            type="text"
            id="count"
            className="countInput"
          />
        </div>
        <div className="form-input">
          <label htmlFor="fileInput" className="fileInputLabel">
            {strings.fileInputLabel}
          </label>
          <input
            type="file"
            id="fileInput"
            ref={this.fileInput}
            className="fileInput"
          />
        </div>
        <div className="form-input">
          <button type="submit" className="submit">
            {strings.inputSubmit}
          </button>
        </div>
      </form>
    );
  }
}

export default Input;
