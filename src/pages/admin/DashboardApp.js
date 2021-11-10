import ReactDOM from 'react-dom';
import {useState} from "react"
import { useNavigate } from 'react-router-dom';
// material
import { Box, Grid, Container, Typography, Link } from '@material-ui/core';
import { Link as RouterLink } from "react-router-dom"
// components
import Page from 'src/components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppWeeklySales,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from 'src/components/_dashboard/app';

// ----------------------------------------------------------------------
export default function DashboardApp() {
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Tableau de Bord</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Link underline="none" component={RouterLink} to="/admin/post-list">
              <AppWeeklySales />
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Link underline="none" component={RouterLink} to="/admin/users">
              <AppNewUsers />
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Link underline="none" component={RouterLink} to="/admin/">
              <AppItemOrders />
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Link underline="none" component={RouterLink} to="/admin/">
              <AppBugReports />
            </Link>
          </Grid>

          <Grid item xs={12} md={8} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <AppCurrentVisits />
          </Grid>
          {/*
          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid>*/}
        </Grid>
      </Container>
    </Page>
  );
}
