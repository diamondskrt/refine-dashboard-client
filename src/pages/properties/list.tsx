import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "ts-debounce";
import { useTable } from "@refinedev/core";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Add, ExpandMoreRounded } from "@mui/icons-material";
import { PropertyCard } from "@/components";
import { propertyTypes } from "@/components/common/form/constants";

export const PropertyList = () => {
  const navigate = useNavigate();

  const [propertyType, setPropertyType] = useState("all");

  const {
    tableQueryResult: { data: allProperties, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorters,
    setSorters,
    setFilters,
  } = useTable();

  useEffect(() => {
    setFilters(
      [
        {
          field: "type",
          operator: "eq",
          value: propertyType,
        },
      ],
      "merge"
    );
  }, [propertyType]);

  if (isLoading) return <Typography>Loading...</Typography>;

  if (isError) return <Typography>Something went wrong...</Typography>;

  const priceOrder = sorters.find((item) => item.field === "price")?.order;

  const onTogglePriceSort = () => {
    const field = "price";

    setSorters([{ field, order: priceOrder === "asc" ? "desc" : "asc" }]);
  };

  const debounceTime = 800;

  const onSearchByTitle = debounce(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      setFilters([
        {
          field: "title",
          operator: "contains",
          value: target.value,
        },
      ]);
    },
    debounceTime
  );

  const onSelectPropertyType = ({ target }: SelectChangeEvent) => {
    setPropertyType(target.value);
  };

  return (
    <Box>
      <Stack gap={4}>
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

        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
          <TextField
            variant="standard"
            size="small"
            placeholder="Search by title"
            sx={{ minWidth: "300px", maxWidth: { xs: "95%", sm: "80%" } }}
            onChange={onSearchByTitle}
          />

          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body1">Type:</Typography>
            <Select
              value={propertyType}
              variant="standard"
              size="small"
              IconComponent={() => <ExpandMoreRounded />}
              sx={{ minWidth: "150px" }}
              onChange={onSelectPropertyType}
            >
              <MenuItem value="all">All</MenuItem>
              {propertyTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box display="flex">
            <FormControlLabel
              control={
                <Checkbox
                  checked={priceOrder === "asc"}
                  onChange={onTogglePriceSort}
                />
              }
              label="Sort Price"
            />
          </Box>
        </Box>
      </Stack>

      {allProperties?.data.length ? (
        <Box mt={6}>
          <Grid container spacing={2}>
            {allProperties.data.map((property) => (
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

          <Box display="flex" gap={4} mt={3}>
            <Box display="flex" alignItems="center" gap={2}>
              <Button
                variant="contained"
                size="small"
                disabled={!(current > 1)}
                onClick={() => setCurrent((prev) => prev - 1)}
              >
                Previos
              </Button>
              <Typography variant="body2">
                Page {current} of {pageCount}
              </Typography>
              <Button
                variant="contained"
                size="small"
                disabled={current === pageCount}
                onClick={() => setCurrent((prev) => prev + 1)}
              >
                Next
              </Button>
            </Box>

            <Box
              display={{ xs: "none", sm: "flex" }}
              alignItems="center"
              gap={1}
            >
              <Typography variant="body2">Show:</Typography>
              <Select
                displayEmpty
                defaultValue="10"
                variant="standard"
                size="small"
                IconComponent={() => <ExpandMoreRounded />}
                onChange={({ target }) => setPageSize(Number(target.value))}
              >
                {[10, 20, 30, 40, 50].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box mt={6}>
          <Typography variant="body1">There are no properties</Typography>
        </Box>
      )}
    </Box>
  );
};
