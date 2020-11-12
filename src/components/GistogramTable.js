import React from "react";

class GistogramTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      table: [],
    };
  }

  componentDidUpdate(prevProps) {
    const table = this.props.table;
    if (prevProps.table !== table) {
      this.setState({
        table: table,
      });
    }
  }

  render() {
    const { table } = this.state;
    return (
      <div className="data-table">
        <h4 className="heading">Дані для гістограми</h4>
        <table className="table">
          <thead>
            <tr>
              <th>№ Інтервалу</th>
              <th>Границя від</th>
              <th>Границя до</th>
              <th>Середина інтервалу</th>
              <th>Частота</th>
              <th>Частотність</th>
            </tr>
          </thead>
          <tbody>
            {table.map((table, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{table.interval[0]}</td>
                <td>{table.interval[1]}</td>
                <td>{table.middle}</td>
                <td>{table.count}</td>
                <td>{table.relCount.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default GistogramTable;
