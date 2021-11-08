import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@material-ui/core';
// utils
import { fNumber, fFcfa } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_DATA = [{ data: localStorage.getItem("getJour") ? JSON.parse(localStorage.getItem("getJour")).map((elem)=>{
        return elem.post_price;
      }) :[400, 430, 448] }];

export default function AppConversionRates() {
  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: true },
      y: {
        formatter: (seriesName) => fFcfa(fNumber(seriesName)),
        title: {
          formatter: (seriesName) => `${seriesName}`
        }
      }
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 }
    },
    xaxis: {
      categories: localStorage.getItem("getJour") ? JSON.parse(localStorage.getItem("getJour")).map((elem)=>{
        return `${elem.titre}`;
      }) : ['Laptop','xbox','etc']
    }
  });

  let Current = 0;
  const Total = localStorage.getItem("getJour") ? JSON.parse(localStorage.getItem("getJour")).map((elem)=>{
    Current += parseInt(elem.post_price);
  }) : 0;

  return (
    <Card>
      <CardHeader title={`Rapport journalier (${ fFcfa(fNumber(Current))})`} subheader="" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
