import { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDelete, useGetIdentity, useShow } from "@refinedev/core";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Fab,
  Stack,
  Typography,
} from "@mui/material";
import { Delete, Edit, Place } from "@mui/icons-material";
import { ConfirmDialog } from "@/components";
import { cardBorderRadius, cardDarkColors, cardLightColors } from "@/constants";
import { IUser } from "@/interfaces/user";
import { ColorModeContext } from "@/providers/colormode-context";

export const PropertyShow = () => {
  const navigate = useNavigate();
  const { mode } = useContext(ColorModeContext);
  const [confirmDialogIsOpen, setConfirmDialogIsOpen] = useState(false);
  const { data: user } = useGetIdentity<IUser>();
  const { id } = useParams();
  const { mutate } = useDelete();
  const { queryResult } = useShow();

  const { data: propertyDetails, isLoading, isError } = queryResult;

  const details = propertyDetails?.data;

  if (isLoading) return <Typography>Loading...</Typography>;

  if (isError) return <Typography>Something went wrong...</Typography>;

  const isCurrentUser = user?.email === details?.creator.email;

  const onRemoveProperty = () => {
    setConfirmDialogIsOpen(true);
  };

  const removeProperty = () => {
    setConfirmDialogIsOpen(false);

    mutate(
      {
        resource: "properties",
        id: id as string,
      },
      {
        onSuccess: () => {
          navigate("/properties");
        },
      }
    );
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={600}>
        Details
      </Typography>

      <Box mt={2}>
        {details ? (
          <Card>
            <CardMedia
              component="img"
              height="350"
              image={details.photo}
              alt={details.title}
              sx={{
                borderTopLeftRadius: cardBorderRadius,
                borderTopRightRadius: cardBorderRadius,
              }}
            />

            <CardContent
              sx={{
                bgcolor:
                  mode == "dark" ? cardDarkColors.bg : cardLightColors.bg,
                color:
                  mode === "dark"
                    ? cardDarkColors.color
                    : cardLightColors.color,
              }}
            >
              <Stack gap={4}>
                <Box
                  display="flex"
                  alignItems="flex-start"
                  justifyContent="space-between"
                  gap={2}
                >
                  <Stack gap={2}>
                    <Typography variant="h6" fontWeight={600}>
                      {details.title}
                    </Typography>
                    <Box>
                      <Fab
                        variant="extended"
                        size="small"
                        color="primary"
                        sx={{ whiteSpace: "nowrap" }}
                      >
                        $ {details.price}
                      </Fab>
                    </Box>
                  </Stack>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Place fontSize="small" />
                    <Typography variant="body1">{details.location}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body1">{details.description}</Typography>
                </Box>
                <Box>
                  <Typography variant="body1">
                    Creator: {details.creator.name}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
            {isCurrentUser ? (
              <CardActions
                disableSpacing
                sx={{
                  borderBottomLeftRadius: cardBorderRadius,
                  borderBottomRightRadius: cardBorderRadius,
                }}
              >
                <Box display="flex" gap={2}>
                  <Button
                    component={Link}
                    to={`/properties/edit/${details._id}`}
                    variant="contained"
                    size="small"
                    startIcon={<Edit />}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<Delete />}
                    onClick={onRemoveProperty}
                  >
                    Delete
                  </Button>
                </Box>
              </CardActions>
            ) : null}
          </Card>
        ) : null}
      </Box>

      <ConfirmDialog
        open={confirmDialogIsOpen}
        close={() => setConfirmDialogIsOpen(false)}
        accept={removeProperty}
      />
    </Box>
  );
};
