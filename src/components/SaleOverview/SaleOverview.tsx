import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const SealsChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sealsOptions = {
      chart: {
        height: 350,
        type: "bar",
        stacked: false,
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#30aba0"],
      series: [
        {
          name: "Data",
          data: [
            21.1, 23, 33.1, 34, 44.1, 44.9, 56.5, 58.5, 29.9, 31, 39.4, 40.7,
            45.6, 42.9, 48.3, 49.5, 50.7, 47.4, 43.3, 38.9, 34.2, 29.3, 25.6,
            20.7,
          ],
        },
      ],
      plotOptions: {
        bar: {
          columnWidth: "30%",
        },
      },
      xaxis: {
        // categories: Array.from({ length: 24 }, (_, i) => i + 1),
      },
      yaxis: {
        // title: {
        //   text: "Values",
        // },
      },
      tooltip: {
        shared: false,
        intersect: true,
        x: {
          show: false,
        },
      },
      legend: {
        horizontalAlign: "left",
        offsetX: 40,
      },
    };

    if (chartRef.current) {
      const sealsOverviewChart = new ApexCharts(chartRef.current, sealsOptions);
      sealsOverviewChart.render();

      // Cleanup function to destroy the chart when component unmounts
      return () => {
        sealsOverviewChart.destroy();
      };
    }
  }, []);

  return <div id="sealsOverview" ref={chartRef}></div>;
};

export default SealsChart;
