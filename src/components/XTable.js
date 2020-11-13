import React from "react";
import { pirson } from "../pirson";

class XTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      table: {
        arr: [],
        countSum: 0,
        x2Sum: 0.0,
        M: 0.0,
        m: 0,
        h: 0,
        vt: 0.0,
        xCrit: 0.0,
        isNorm: false,
      },
    };
  }

  componentDidUpdate(prevProps) {
    const table = this.props.table;
    console.log(table);
    const inputData = this.props.inputData;
    const laplas = this.laplas;
    if (prevProps.table !== table) {
      const N = inputData.length;
      const K = Math.ceil(1 + 3.322 * Math.log10(N));
      const inputMin = Math.min(...inputData);
      const inputMax = Math.max(...inputData);
      const h = Math.ceil((inputMax - inputMin) / K);
      const m = table.length;
      const r = 2;
      const q = m - r - 1;
      const M = inputData.reduce((a, b) => a + b, 0) / N;
      let middle = 0;
      let sum = 0;
      table.forEach((t) => {
        middle += t.middle * t.count;
        sum += Math.pow(t.middle, 2) * t.count;
      });
      middle = middle / N;
      sum = sum / N - Math.pow(middle, 2);
      sum = Math.sqrt(sum);
      const vt = M / sum;
      const newTable = table.map((t) => {
        let chunkSum = t.chunk.reduce((a, b) => a + b, 0) / N;
        const z = (t.count - middle) / sum;
        const f = laplas(z);
        const p = (h / sum) * f;
        const pm = p * N;
        const x2 = Math.pow(t.count - pm, 2) / pm;
        console.log(M);
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
      const countSum = newTable.map((t) => t.count).reduce((a, b) => a + b, 0);
      const x2Sum = newTable.map((t) => t.x2).reduce((a, b) => a + b, 0);
      let xCrit;
      if (Number.isNaN(x2Sum)) xCrit = 0;
      else xCrit = pirson[Math.round(x2Sum) - 1][q - 2];
      console.log(xCrit);
      const isNorm = xCrit >= 0.05;
      const object = {
        arr: newTable,
        countSum: countSum,
        x2Sum: x2Sum,
        xCrit: xCrit,
        isNorm: isNorm,
        vt: vt,
        M: M,
        q: q,
        m: m,
        h: h,
      };
      this.setState({
        table: object,
      });
    }
  }

  setIsNormMsg = (isNorm) => {
    if (isNorm) {
      return "Так як P(X2, q) >= 0.05, то нульова гіпотеза про відповідність експериментального закону теоретичному, є вірною з імовірністю 0,95.";
    } else {
      return "Так як P(X2, q) < 0.05, то нульова гіпотеза про відповідність експериментального закону теоретичному, є вірною з імовірністю 0,05.";
    }
  };

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
            {table.arr.map((table, index) => (
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
              <td>{table.countSum}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>{table.x2Sum.toFixed(4)}</td>
            </tr>
            <tr>
              <td colspan="7">Кількість інтервалів: {table.m}</td>
            </tr>
            <tr>
              <td colspan="7">Довжина інтервалу: {table.h}</td>
            </tr>
            <tr>
              <td colspan="7">Кількість ступенів волі: {table.q}</td>
            </tr>
            <tr>
              <td colspan="7">
                P(X<sup>2</sup>, q): {table.xCrit.toFixed(4)}
              </td>
            </tr>
            <tr>
              <td colspan="7">Математичне очікування: {table.M.toFixed(4)}</td>
            </tr>
            <tr>
              <td colspan="7">
                Оцінка коефіцієнта варіації V<sub>t</sub>: {table.vt.toFixed(4)}
              </td>
            </tr>
            <tr>
              <td colspan="7">{this.setIsNormMsg(table.isNorm)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default XTable;
