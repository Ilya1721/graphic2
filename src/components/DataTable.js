import React from "react";

class DataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const { N, InputData } = this.props.data;
    const ceil = Math.ceil;

    Object.defineProperty(Array.prototype, "chunk", {
      value: function (n) {
        return Array.from(Array(ceil(this.length / n)), (_, i) =>
          this.slice(i * n, i * n + n)
        );
      },
    });

    if (N !== undefined) {
      this.setState(
        {
          data: InputData.chunk(10),
        },
        () => {
          console.log(this.state.data);
        }
      );
    } else {
      this.setState(
        {
          data: Array(20).fill(Array(10).fill(0)),
        },
        () => {
          console.log(this.state.data);
        }
      );
    }
  }

  render() {
    return (
      <div className="data-table">
        <h4 className="heading">Вхідні данні</h4>
        <table className="table"></table>
      </div>
    );
  }
}

export default DataTable;
