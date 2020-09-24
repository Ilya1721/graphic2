import strings from "../resources/strings";

export const graphConfig = {
  axes: {
    x: {
      axisLabelFormatter: function (x) {
        return x.toPrecision(2);
      },
    },
    y: {
      axisLabelFormatter: function (y) {
        return y.toPrecision(3);
      },
    },
  },
};

export default { graphConfig };
