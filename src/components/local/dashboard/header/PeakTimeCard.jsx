import Chart from "react-apexcharts";

const PeakTimeCard = ({
   peakTimeData,
   peakTimeDataDaily,
   activeButton,
}) => {
   const filteredPeakTimeData = peakTimeData?.filter(
      (_, index) => index % 3 === 0
   );

   console.log({ peakTimeData, filteredPeakTimeData });
   const times =
      peakTimeData && peakTimeData?.map((entry) => entry?.Time);
   const orders =
      peakTimeData && peakTimeData?.map((entry) => entry?.Orders);

   const timesDaily =
      peakTimeDataDaily &&
      peakTimeDataDaily?.map((entry) => entry?.Day);
   const ordersDaily =
      peakTimeDataDaily &&
      peakTimeDataDaily?.map((entry) => entry?.Orders);

   const options = {
      chart: {
         zoom: {
            enabled: false,
         },
         id: "basic-line",
         type: "area",

         toolbar: {
            show: false, // Hides the menu on top of the chart
         },
      },
      dataLabels: {
         enabled: false,
      },

      xaxis: {
         tickAmount: 8,
         categories: activeButton === "daily" ? timesDaily : times,

         axisBorder: {
            show: false, // Hides the x-axis bottom line
         },
         axisTicks: {
            show: false, // Hides the small lines above the labels
         },
         tooltip: {
            enabled: false,
         },
         labels: {
            rotate: 0,
         },
      },

      yaxis: {
         labels: {
            show: false, // Hides labels on the y-axis
         },
      },
      grid: {
         yaxis: {
            lines: {
               show: false, // Hides the y-axis lines
            },
         },
      },

      stroke: {
         curve: "smooth", // Adds tension to the line chart
         width: 2, // Sets the line thickness
         colors: ["#3DB9B9"], // Sets a fixed color for the line
      },
      fill: {
         type: "gradient",
         gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.9,
            opacityTo: 1,
            stops: [0, 90, 100],
         },
      },
   };

   const series = [
      {
         name: "Series 1",
         data: activeButton === "daily" ? ordersDaily : orders,
         // data: [30, 40, 45, 22, 25, 60, 40, 30, 80],
      },
   ];

   return (
      <div className="line-chart">
         <Chart
            options={options}
            series={series}
            type="area"
            width="100%"
            height="120"
         />
      </div>
   );
};

export default PeakTimeCard;
