import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Fab,
  Stack,
  Typography,
} from "@mui/material";
import { Place } from "@mui/icons-material";
import { ColorModeContext } from "@/providers/colormode-context";
import { cardBorderRadius, cardDarkColors, cardLightColors } from "@/constants";
import { PropertyTypeValues } from "@/interfaces/common";

interface PropertyCardProps {
  id: string;
  photo: string;
  title: string;
  type: PropertyTypeValues;
  price: number | null;
  location: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  photo,
  title,
  type,
  price,
  location,
}) => {
  const { mode } = useContext(ColorModeContext);

  const maxPropertyLength = 22;

  const getShortProperty = (property: string) => {
    return property.length > maxPropertyLength
      ? `${property.substring(0, maxPropertyLength)}...`
      : property;
  };

  return (
    <Card component={Link} to={`/properties/show/${id}`}>
      <CardMedia
        component="img"
        height="150"
        image={photo}
        alt={title}
        sx={{
          borderTopLeftRadius: cardBorderRadius,
          borderTopRightRadius: cardBorderRadius,
        }}
      />
      <CardContent
        sx={{
          bgcolor: mode === "dark" ? cardDarkColors.bg : cardLightColors.bg,
          color: mode === "dark" ? cardDarkColors.color : cardLightColors.color,
          borderBottomLeftRadius: cardBorderRadius,
          borderBottomRightRadius: cardBorderRadius,
        }}
      >
        <Box display="flex" justifyContent="space-between" gap={2}>
          <Stack gap={2}>
            <Typography variant="body1" fontWeight={600}>
              {getShortProperty(title)}
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Place fontSize="small" />
              <Typography variant="body2">{location}</Typography>
            </Box>
            <Typography variant="body2">{getShortProperty(type)}</Typography>
          </Stack>
          <Fab
            variant="extended"
            size="small"
            color="primary"
            sx={{ whiteSpace: "nowrap" }}
          >
            $ {price}
          </Fab>
        </Box>
      </CardContent>
    </Card>
  );
};
