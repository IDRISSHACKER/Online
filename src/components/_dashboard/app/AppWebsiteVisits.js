import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@material-ui/core';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const data = [];
const dates = [];
let lData = [];

if(localStorage.getItem("rStat")){

  lData = JSON.parse(localStorage.getItem("rStat"));

}else{

  lData = [{'post_price':'1500', 'created_at':"15:13"},{'post_price':'1500', 'created_at':"15:13"}];

}

for(let i=lData.length-1; i>=0; i--){
  data.push(lData[i].total);
  dates.push(lData[i].jour);
}
const CHART_DATA = [
  {
    name: 'Vente',
    type: 'bar',
    data
  }
];



export default function AppWebsiteVisits() {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [3] },
    plotOptions: { bar: { columnWidth: '80%', borderRadius: 4, backgroundColor: "tomato" } },
    fill: { type: ['color'] },
    labels: dates,
    xaxis: { type: 'label' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} FCFA`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Statistique des ventes" subheader="7 Derniers jours" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
