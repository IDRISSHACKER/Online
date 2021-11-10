import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@material-ui/core';
//
import { BaseOptionChart } from '../../charts';
import {isEmpty} from "src/utils/isEmpty"
import {useSelector} from "react-redux"
import { fFcfa } from 'src/utils/formatNumber';
import { useTheme, experimentalStyled as styled } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

export default function AppWebsiteVisits() {

  const theme = useTheme();

  const stats = useSelector(state => state.statSaleReducer)

  const data = [
    { 
      data: !isEmpty(stats) && stats.map(stat=>parseInt(stat.totalPrice))
    }
  ]

  const labels = !isEmpty(stats) && stats.map((stat)=>`${stat.created_at}`)


  const chartOptions = merge(BaseOptionChart(),{
    series: [{
    name: "statistiques",
    data: stats
  }],
    chart: {
    type: 'area',
    height: 350,
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  title: {
    text: 'Partitionner par jour',
    align: 'left'
  },
  subTitle: {
    text: '',
    align: 'left'
  },
  labels: labels,
  xaxis: {
    type: 'datetime',
  },
  yaxis: {
    opposite: true
  },
  legend: {
    horizontalAlign: 'left'
  }
  });



  return (
    <Card>
      <CardHeader title="Statistique des ventes" subheader="" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
      {!isEmpty(stats) && 
      <ReactApexChart 
      type="area"
      series={data} 
      options={chartOptions} 
      height={364} /> 
      }
      </Box>
    </Card>
  );
}
