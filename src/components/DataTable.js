import React from "react";

class DataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidUpdate(prevProps) {
    const inputData = this.props.inputData;
    if (prevProps.inputData !== inputData) {
      this.setState({
        data: inputData.chunk(10),
      });
    }
  }

  componentDidMount() {
    Object.defineProperty(Array.prototype, "chunk", {
      value: function (n) {
        return Array.from(Array(Math.ceil(this.length / n)), (_, i) =>
          this.slice(i * n, i * n + n)
        );
      },
    });

    this.setState({
      data: Array(20).fill(Array(10).fill(0)),
    });
  }

  render() {
    return (
      <div className="data-table">
        <h4 className="heading">Вхідні данні</h4>
        <table className="table">
          <tbody>
            {this.state.data.map((chunk, index) => (
              <tr key={index}>
                {chunk.map((item, index) => (
                  <td key={index}>{item}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DataTable;
