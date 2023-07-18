import { ChangeEvent, useContext, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FormProps, FormTypes, FormValues, PropertyTypeValues } from "./types";
import { cardBorderRadius, cardDarkColors, cardLightColors } from "@/constants";
import { ColorModeContext } from "@/providers/colormode-context";
import { ExpandMoreRounded } from "@mui/icons-material";
import { propertyTypes, textFieldWidth } from "./constants";

export const Form: React.FC<FormProps> = ({
  type,
  propertyImg,
  onFinishHandler,
  formLoading,
  onImageChange,
}) => {
  const { mode } = useContext(ColorModeContext);

  const [formValues, setFormValues] = useState<FormValues>({
    title: "",
    description: "",
    type: PropertyTypeValues.APARTMENT,
    price: null,
    location: "",
  });

  const handleOnChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleOnFileInputChange = ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    onImageChange(target.files?.[0]);
  };

  return (
    <Stack gap={4}>
      <Typography variant="h5" fontWeight={600}>
        {type === FormTypes.CREATE ? "Create" : "Edit"} a property
      </Typography>

      <Stack
        bgcolor={mode == "dark" ? cardDarkColors.bg : cardLightColors.bg}
        color={mode === "dark" ? cardDarkColors.color : cardLightColors.color}
        px={4}
        py={6}
        gap={4}
        borderRadius={cardBorderRadius}
      >
        <TextField
          variant="standard"
          label="Property Name"
          name="title"
          sx={{ width: textFieldWidth }}
          onChange={handleOnChange}
        />

        <TextField
          variant="standard"
          label="Description"
          name="description"
          multiline
          rows={2}
          sx={{ width: textFieldWidth }}
          onChange={handleOnChange}
        />

        <FormControl variant="standard">
          <InputLabel>Property Type</InputLabel>
          <Select
            value={formValues.type}
            name="type"
            IconComponent={() => <ExpandMoreRounded />}
            sx={{ width: textFieldWidth }}
            onChange={(event) =>
              handleOnChange(
                event as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              )
            }
          >
            {propertyTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          variant="standard"
          label="Property Price"
          name="price"
          type="number"
          sx={{ width: textFieldWidth }}
          onChange={handleOnChange}
        />

        <TextField
          variant="standard"
          label="Property Location"
          name="location"
          sx={{ width: textFieldWidth }}
          onChange={handleOnChange}
        />

        <Box>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body1">Property Photo</Typography>

            <Button component="label" variant="text">
              upload *
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleOnFileInputChange}
              />
            </Button>
          </Box>

          <Typography variant="body1">{propertyImg?.name}</Typography>
        </Box>

        <Box>
          <Button
            type="submit"
            variant="contained"
            disabled={formLoading}
            onClick={() => onFinishHandler(formValues)}
          >
            Submit
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};
