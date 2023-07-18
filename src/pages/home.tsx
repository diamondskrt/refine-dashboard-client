import { useList } from '@refinedev/core/dist/hooks';
import { Box, Grid, Stack, Typography } from '@mui/material';
import {
  purple,
  pink,
  indigo,
  cyan,
  deepOrange,
  blueGrey,
} from '@mui/material/colors';

import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  PropertyCard,
  TopAgent,
} from '@/components';

export const Home: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" mb={3}>
        Dashboard
      </Typography>

      <Stack gap={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <PieChart
              title="Properties For Sale"
              value={684}
              series={[75, 25]}
              colors={[purple[500], pink[600]]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <PieChart
              title="Properties For Rent"
              value={550}
              series={[60, 40]}
              colors={[indigo[500], cyan[600]]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <PieChart
              title="Total Customers"
              value={5684}
              series={[75, 25]}
              colors={[deepOrange[500], pink[600]]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <PieChart
              title="Properties For Cities"
              value={523}
              series={[75, 25]}
              colors={[purple[500], blueGrey[600]]}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} lg={8}>
            <TotalRevenue />
          </Grid>
          <Grid item xs={12} lg={4}>
            <PropertyReferrals />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};
