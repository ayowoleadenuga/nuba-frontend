"use client";
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const OverallSalesChart = () => {
  //   console.log("chart session count", sessionsCount);
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // const labels = sessionsCount.map(data => formatChartDate(data.date));
    // const dataValues = sessionsCount.map(data => data.total);
    const dataValues = [0, 10, 25, 70, 40];
    const labels = ["Mar 01", "Mar 01", "Mar 01", "Mar 01", "Mar 01"];
    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Overall Sales",
            data: dataValues,
            backgroundColor: "#2A4152",
            barThickness: 50,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return <canvas ref={chartRef} className="" />;
};

export default OverallSalesChart;
