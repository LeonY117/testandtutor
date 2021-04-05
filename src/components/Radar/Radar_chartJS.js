import React, { Component } from "react";
// import Canvas from '../../../Canvas/Canvas'
import Chart from "chart.js";

Chart.defaults.global.legend.display = false;

class radar extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "radar",
      data: {
        labels: [
          "Functions and Equations",
          "Algebra",
          "Calculus",
          "Trigonometry",
          "Statistics",
        ],
        datasets: [
          {
            data: [5, 6, 6, 4, 6],
            backgroundColor: "rgba(67,195,232.6, 0.2)",
            borderColor: "rgba(52,86,191,0.5)",
            // fill: false,
            radius: 6,
            pointRadius: 6,
            pointBorderWidth: 3,
            pointHoverRadius: 10,
          },
        ],
      },
      options: {
        scale: {
          ticks: {
            beginAtZero: true,
            min: 1,
            max: 7,
            stepSize: 1,
          },
          pointLabels: {
            fontSize: 18,
          },
        },
      },
    });
  }
  render() {
    return (
      <div>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}

export default radar;
