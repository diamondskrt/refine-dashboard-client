import { ChangeEvent, useContext } from "react";
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
import { FormProps, FormTypes } from "./types";
import { cardBorderRadius, cardDarkColors, cardLightColors } from "@/constants";
import { ColorModeContext } from "@/providers/colormode-context";
import { ExpandMoreRounded } from "@mui/icons-material";
import { propertyTypes, textFieldWidth } from "./constants";
import { useForm } from "@refinedev/react-hook-form";
import { PropertyTypeValues } from "@/interfaces/common";

export const Form: React.FC<FormProps> = ({
  type,
  propertyImg,
  onFinishHandler,
  formLoading,
  onImageChange,
}) => {
  const { mode } = useContext(ColorModeContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFileInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onImageChange(target.files?.[0]);
  };

  return (
    <form onSubmit={handleSubmit(onFinishHandler)}>
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
            sx={{ width: textFieldWidth }}
            error={Boolean(errors.title)}
            helperText={errors.title?.message as string}
            {...register("title", {
              required: "Enter property name",
            })}
          />

          <TextField
            variant="standard"
            label="Description"
            multiline
            rows={2}
            sx={{ width: textFieldWidth }}
            error={Boolean(errors.description)}
            helperText={errors.description?.message as string}
            {...register("description", { required: "Enter Description" })}
          />

          <FormControl variant="standard">
            <InputLabel>Property Type</InputLabel>
            <Select
              displayEmpty
              defaultValue={PropertyTypeValues.APARTMENT}
              IconComponent={() => <ExpandMoreRounded />}
              sx={{ width: textFieldWidth }}
              {...register("type")}
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
            sx={{ width: textFieldWidth }}
            error={Boolean(errors.price)}
            helperText={errors.price?.message as string}
            {...register("price", {
              required: "Enter property price",
              onChange: ({ target }) =>
                (target.value = target.value.replace(/\D/g, "")),
            })}
          />

          <TextField
            variant="standard"
            label="Property Location"
            sx={{ width: textFieldWidth }}
            error={Boolean(errors.location)}
            helperText={errors.location?.message as string}
            {...register("location", { required: "Enter Location" })}
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
                  onChange={onFileInputChange}
                />
              </Button>
            </Box>

            <Typography variant="body1">{propertyImg?.name}</Typography>
          </Box>

          <Box>
            <Button type="submit" variant="contained" disabled={formLoading}>
              Submit
            </Button>
          </Box>
        </Stack>
      </Stack>
    </form>
  );
};
