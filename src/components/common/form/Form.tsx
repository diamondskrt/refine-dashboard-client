import { ChangeEvent, useContext, useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { useGetIdentity } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
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
import { PropertyTypeValues } from "@/interfaces/common";
import { IUser } from "@/interfaces/user";

export const Form: React.FC<FormProps> = ({
  type,
  propertyImg,
  onImageChange,
  formLoading,
  onFinish,
}) => {
  const { data: user } = useGetIdentity<IUser>();

  const { mode } = useContext(ColorModeContext);

  const [uploadImageError, setUploadImageError] = useState(false);

  useEffect(() => {
    if (!propertyImg.name) return;

    setUploadImageError(false);
  }, [propertyImg]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onFileInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onImageChange(target.files?.[0]);
  };

  const onFinishHandler = async (data: FieldValues) => {
    if (!propertyImg.name) {
      setUploadImageError(true);
      return;
    }

    const formData: FieldValues = { ...data, photoUrl: propertyImg.url };

    if (type === FormTypes.CREATE) {
      formData.email = user?.email;
    }

    await onFinish(formData);
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
            InputLabelProps={{ shrink: Boolean(watch("title")) }}
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
            InputLabelProps={{ shrink: Boolean(watch("description")) }}
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
            InputLabelProps={{ shrink: Boolean(watch("price")) }}
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
            InputLabelProps={{ shrink: Boolean(watch("location")) }}
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

            {uploadImageError ? (
              <FormHelperText error>Please, upload an image</FormHelperText>
            ) : null}

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
