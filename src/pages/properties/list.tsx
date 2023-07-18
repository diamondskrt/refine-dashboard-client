import { useNavigate } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useTable } from "@refinedev/core";
import { PropertyCard } from "@/components";

export const PropertyList = () => {
  const navigate = useNavigate();

  const {
    tableQueryResult: { data: allProperties, isLoading, isError },
  } = useTable();

  if (isLoading) return <Typography>isLoading...</Typography>;

  if (isError) return <Typography>isError...</Typography>;

  return (
    <Stack gap={10}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight={600}>
          PropertyList
        </Typography>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate("/properties/create")}
        >
          Add Property
        </Button>
      </Box>

      <Box>
        {(allProperties?.data || []).map((property) => (
          <PropertyCard
            key={property._id}
            id={property._id}
            title={property.title}
            description={property.description}
            type={property.type}
            price={property.price}
            location={property.location}
            photo={property.photo}
          />
        ))}
      </Box>
    </Stack>
  );
};
