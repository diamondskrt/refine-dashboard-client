import { useList } from "@refinedev/core";
import { Box, Grid, Stack, Typography } from "@mui/material";
import {
  purple,
  pink,
  indigo,
  cyan,
  deepOrange,
  blueGrey,
} from "@mui/material/colors";
import {
  PieChart,
  PropertyCard,
  PropertyReferrals,
  TotalRevenue,
} from "@/components";

export const Home: React.FC = () => {
  const {
    data: latestProperties,
    isLoading,
    isError,
  } = useList({
    resource: "properties",
    config: {
      pagination: {
        pageSize: 4,
      },
    },
  });

  if (isLoading) return <Typography>Loading...</Typography>;

  if (isError) return <Typography>Something went wrong...</Typography>;

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

        {latestProperties?.data && latestProperties.data.length ? (
          <Stack gap={2}>
            <Typography variant="body1">Last Properties</Typography>
            <Grid container spacing={2}>
              {latestProperties.data.map((property) => (
                <Grid key={property._id} item xs={12} md={6} lg={4} xl={3}>
                  <PropertyCard
                    id={property._id}
                    title={property.title}
                    type={property.type}
                    price={property.price}
                    location={property.location}
                    photo={property.photo}
                  />
                </Grid>
              ))}
            </Grid>
          </Stack>
        ) : null}
      </Stack>
    </Box>
  );
};
