import { useContext } from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { cardDarkColors, cardLightColors } from "@/constants";
import { ColorModeContext } from "@/providers/colormode-context";
import { ProfileCardProps } from "./types";

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  email,
  avatar,
  propertiesCount,
}) => {
  const { mode } = useContext(ColorModeContext);

  return (
    <Box
      sx={{
        bgcolor: mode === "dark" ? cardDarkColors.bg : cardLightColors.bg,
        color: mode === "dark" ? cardDarkColors.color : cardLightColors.color,
        p: 2,
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar
          variant="square"
          sx={{ width: 80, height: 80, borderRadius: 1 }}
          src={avatar}
        />
        <Stack gap={1}>
          <Box>
            <Typography variant="body1">{name}</Typography>
            <Typography variant="body2" color="grey">
              {email}
            </Typography>
          </Box>
          <Typography variant="body2" color="grey">
            Properties: {propertiesCount}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};
