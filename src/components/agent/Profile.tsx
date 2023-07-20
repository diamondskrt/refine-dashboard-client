import { Box, Grid, Stack, Typography } from "@mui/material";
import { PropertyCard, ProfileCard } from "@/components";
import { ProfileProps } from "./types";
import { Property } from "@/interfaces/common";

export const Profile: React.FC<ProfileProps> = ({ userData, currentUser }) => {
  if (!userData) return null;

  return (
    <Box>
      <Typography variant="h5" fontWeight={600}>
        {currentUser ? "My Profile" : "Profile"}
      </Typography>

      <Stack mt={6} gap={3}>
        <ProfileCard
          key={userData._id}
          name={userData.name}
          email={userData.email}
          avatar={userData.avatar}
          propertiesCount={userData.allProperties.length}
        />

        {currentUser && userData.allProperties.length ? (
          <Stack gap={2}>
            <Typography variant="body1">
              {currentUser ? "My Properties" : "Properties"}
            </Typography>
            <Grid container spacing={2}>
              {userData.allProperties.map((property: Property) => (
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
