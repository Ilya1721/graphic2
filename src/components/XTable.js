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
      //const tsAll = inputData.reduce((a, b) => a + b, 0) / inputData.length;
      const newTable = table.map((t) => {
        const N = t.chunk.length;
        const middle = t.middle;
        const ts = t.chunk.reduce((a, b) => a + b, 0) / N;
        let sum = 0;
        t.chunk.forEach((i) => {
          sum += Math.pow(i - ts, 2);
        });
        const sq = sum / (N - 1);
        const s = Math.sqrt(sq);
        const f = (middle - ts) / s;
        const ft = laplas(f);
        const K = Math.ceil(1 + 3.322 * Math.log10(N));
        const inputMin = Math.min(...t.chunk);
        const inputMax = Math.max(...t.chunk);
        const deltaT = Math.ceil((inputMax - inputMin) / K);
        const p = (deltaT / s) * laplas(middle);
        console.log(ts);
        console.log(s);
        console.log(f);
        console.log(ft);
        console.log(p);
        console.log(middle);
        console.log(t.chunk);

        return {
          ...t,
          ft: ft,
        };
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
    //console.log(table);
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
          <tbody></tbody>
        </table>
      </div>
    );
  }
}

export default XTable;
