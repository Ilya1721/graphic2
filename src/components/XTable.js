import React from "react";

class XTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      table: [],
    };
  }

  componentDidUpdate(prevProps) {
    const table = this.props.table;
    const inputData = this.props.inputData;
    const laplas = this.laplas;
    if (prevProps.table !== table) {
      const N = inputData.length;
      const h = Math.ceil(1 + 3.322 * Math.log10(N));
      const m = table.length;
      const r = 2;
      const q = m - r - 1;
      let middle = 0;
      let sum = 0;
      table.forEach((t) => {
        middle += t.middle * t.count;
        sum += Math.pow(t.middle, 2) * t.count;
      });
      middle = middle / N;
      sum = sum / N - Math.pow(middle, 2);
      sum = Math.sqrt(sum);
      const newTable = table.map((t) => {
        const z = (t.count - middle) / sum;
        const f = laplas(z);
        const p = ((h * N) / sum) * f;
        const pm = p; //need to fix
        const x2 = Math.pow(t.count - p, 2) / p;
        console.log(f);
        console.log(p);
        console.log(pm);
        console.log(q);
        console.log(x2);
        console.log(t.chunk);

        return {
          ...t,
          f: f,
          p: p,
          pm: pm,
          x2: x2,
        };
      });
      this.setState({
        table: newTable,
      });
    }
  }

  laplas = (x) => {
    return (
      (1 / Math.sqrt(2 * Math.PI)) * Math.pow(Math.E, -(Math.pow(x, 2) / 2))
    );
  };

  render() {
    const { table } = this.state;
    return (
      <div className="data-table xtable">
        <h4 className="heading">
          Для величини X<sup>2</sup>
        </h4>
        <table className="table">
          <thead>
            <tr>
              <th>№ Інтервалу</th>
              <th>Частота</th>
              <th>Середина інтервалу</th>
              <th>Функція щільності</th>
              <th>Імовірність</th>
              <th>Теоретична частота</th>
              <th>
                X<sup>2</sup>
              </th>
            </tr>
          </thead>
          <tbody>
            {table.map((table, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{table.count}</td>
                <td>{table.middle}</td>
                <td>{table.f.toFixed(4)}</td>
                <td>{table.p.toFixed(4)}</td>
                <td>{table.pm.toFixed(4)}</td>
                <td>{table.x2.toFixed(4)}</td>
              </tr>
            ))}
            <tr>
              <td>Сума:</td>
              <td>{table.map((t) => t.count).reduce((a, b) => a + b, 0)}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                {table
                  .map((t) => t.x2)
                  .reduce((a, b) => a + b, 0)
                  .toFixed(4)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default XTable;
