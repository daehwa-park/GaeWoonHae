// import { useEffect, useRef } from "react";
// import Chart from "chart.js/auto";

// const LineChart = () => {
//   const chartRef = useRef(null);
//   const chartInstanceRef = useRef(null);

//   useEffect(() => {
//     const ctx = chartRef.current.getContext("2d");

//     const createChart = () => {
//       Chart.register(
//         Chart.LineController,
//         Chart.CategoryScale,
//         Chart.LinearScale,
//         Chart.PointElement,
//         Chart.LineElement
//       );
//       chartInstanceRef.current = new Chart(ctx, {
//         type: "line",
//         data: {
//           labels: ["1", "2", "3", "4", "5", "6"],
//           datasets: [
//             {
//               label: "Data 1",
//               data: [0, 20, 30, 40, 50, 60],
//               borderColor: "rgba(255, 99, 132, 1)",
//               backgroundColor: "rgba(255, 99, 132, 0.2)",
//               pointRadius: 5,
//               pointBackgroundColor: "rgba(255, 99, 132, 1)",
//               pointBorderColor: "rgba(255, 255, 255, 1)",
//               pointHoverRadius: 7,
//               pointHoverBackgroundColor: "rgba(255, 99, 132, 1)",
//               pointHoverBorderColor: "rgba(255, 255, 255, 1)",
//               fill: false,
//             },
//           ],
//         },
//         options: {
//           scales: {
//             x: {
//               display: true,
//             },
//             y: {
//               beginAtZero: true,
//               max: 100,
//             },
//           },
//         },
//       });
//     };

//     const destroyChart = () => {
//       if (chartInstanceRef.current) {
//         chartInstanceRef.current.destroy();
//         chartInstanceRef.current = null;
//       }
//     };

//     const initializeChart = () => {
//       destroyChart();
//       createChart();
//     };

//     initializeChart();

//     return () => {
//       destroyChart();
//     };
//   }, []);

// //   return <canvas ref={chartRef} />;
// };

// export default LineChart;
