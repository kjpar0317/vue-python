<template>
  <apexchart
    :options="chartObj.options"
    :series="chartObj.series"
    width="100%"
    height="100%"
  ></apexchart>
</template>

<script>
import { reactive } from "vue";
import VueApexCharts from "vue3-apexcharts";
import chroma from "chroma-js";

export default {
  props: ["index", "title"],
  components: {
    apexchart: VueApexCharts,
  },
  setup(props) {
    const chartObj = reactive({
      series: [76, 67, 61, 90],
      options: {
        chart: {
          type: "radialBar",
        },
        options: {
          radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
              margin: 5,
              size: "30%",
              background: "transparent",
              image: undefined,
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                show: false,
              },
            },
          },
        },
        // colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
        colors: chroma.scale("Spectral").colors(4),
        labels: ["Vimeo", "Messenger", "Facebook", "LinkedIn"],
        legend: {
          show: true,
          floating: true,
          fontSize: "12px",
          position: "left",
          offsetX: 160,
          offsetY: 15,
          labels: {
            useSeriesColors: true,
          },
          markers: {
            size: 0,
          },
          formatter: function (seriesName, opts) {
            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
          },
          itemMargin: {
            vertical: 3,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                show: true,
              },
            },
          },
        ],
      },
    });

    const handleClose = (val) => {
      props.onRemove(val);
    };

    return { chartObj, handleClose };
  },
};
</script>
