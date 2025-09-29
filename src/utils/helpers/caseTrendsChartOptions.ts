import Highcharts from "highcharts";

export const getCaseTrendsChartOptions = (
  months: string[],
  caseCounts: number[]
) => {
  return {
    chart: {
      type: "column",
      spacingBottom: 0,
    },
    title: { text: null },
    legend: { enabled: false },
    xAxis: {
      categories: months,
      title: { text: null },
    },
    yAxis: {
      min: 0,
      max: Math.ceil((Math.max(...caseCounts) || 90) / 30) * 30,
      tickInterval: 30,
      title: { text: null },
    },
    tooltip: {
      formatter: function (this: Highcharts.Point) {
        return `<b>${this.category}</b>: ${this.y} cases`;
      },
    },
    series: [
      {
        data: caseCounts,
        colorByPoint: true,
        dataLabels: { enabled: true },
      },
    ],
    colors: ["#D9D9D9"],
  };
};
