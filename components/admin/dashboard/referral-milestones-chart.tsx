import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ReferralMilestonesChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["30%", "60%", "100%"],
        datasets: [
          {
            label: "Sample Data",
            data: [30, 60, 10],
            backgroundColor: ["#1F2D3D", "#FFC107", "#8FB7DD"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div
      className="mt-10"
      style={{ position: "relative", width: "200px", height: "200px" }}
    >
      <canvas ref={chartRef} />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <p className="text-[18px] font-[600] ">47,376</p>
        <p className="text-[12px] text-[#8C97A7]">£500,298.33</p>
      </div>
    </div>
  );
};

export default ReferralMilestonesChart;
