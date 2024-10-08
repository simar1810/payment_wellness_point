import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const SalesGraph = ({ orders }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef.current && orders) {
      const ctx = chartRef.current.getContext("2d");

      const data = orders.map((order) => ({
        date: new Date(order.createdAt).toLocaleDateString(),
        price: parseInt(order.sellingPrice),
      }));

      const maxPrice = Math.max(...data.map((item) => item.price));
      const suggestedMax = maxPrice > 20000 ? 20000 : maxPrice + 5000;

      const config = {
        type: "bar", // Change type to 'bar'
        data: {
          labels: data.map((item) => item.date),
          datasets: [
            {
              label: "Revenue",
              data: data.map((item) => item.price),
              backgroundColor: "#036231",
              borderColor: "#38803e",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Sales Overview",
            },
          },
          interaction: {
            intersect: false,
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: "Revenue (₹)",
              },
              suggestedMin: 0,
              suggestedMax: suggestedMax,
              ticks: {
                callback: (value) => `₹${value}`,
              },
            },
          },
        },
      };

      chartInstance.current = new Chart(ctx, config);
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartRef, orders]);

  return (
    <div className='bg-white shadow-md rounded-md p-1 mt-10'>
      <canvas
        ref={chartRef}
        style={{ width: "100%", height: "400px" }}
      ></canvas>
    </div>
  );
};

export default SalesGraph;
