import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

interface Props {
  green: boolean;
  red: boolean;
}

const options = (
  type: "area" | "line" | "bar",
  height: string,
  numbers: number[],
  color: string
) => {
  return {
    chart: {
      height: height,
      width: "100%",
      type: type,
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    grid: {
      show: false,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    series: [
      {
        name: "serie1",
        data: numbers,
      },
    ],
    fill: {
      colors: [color],
    },
    stroke: {
      colors: [color],
      width: 3,
    },
    yaxis: {
      show: false,
    },
    xaxis: {
      show: false,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };
};

const numArr = (min: number, max: number): number[] => {
  return Array.from(
    { length: 10 },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );
};

const AnalyticsCharts: React.FC<Props> = ({ green, red }) => {
  const chart1Ref = useRef<HTMLDivElement>(null);
  const chart2Ref = useRef<HTMLDivElement>(null);
  const chart1Instance = useRef<ApexCharts | null>(null);
  const chart2Instance = useRef<ApexCharts | null>(null);

  useEffect(() => {
    if (green && chart1Ref.current && !chart1Instance.current) {
      chart1Instance.current = new ApexCharts(
        chart1Ref.current,
        options("area", "60px", numArr(10, 99), "#4fd1c5")
      );
      chart1Instance.current.render();
    }

    if (red && chart2Ref.current && !chart2Instance.current) {
      chart2Instance.current = new ApexCharts(
        chart2Ref.current,
        options("area", "60px", numArr(10, 99), "#4c51bf")
      );
      chart2Instance.current.render();
    }

    return () => {
      chart1Instance.current?.destroy();
      chart2Instance.current?.destroy();
      chart1Instance.current = null;
      chart2Instance.current = null;
    };
  }, [green, red]);

  return (
    <div>
      {green && <div ref={chart1Ref} className="analytics_1 mt-4"></div>}
      {red && <div ref={chart2Ref} className="analytics_1 mt-4"></div>}
    </div>
  );
};

export default AnalyticsCharts;
