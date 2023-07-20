import { useContext } from "react";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { cardBorderRadius, cardDarkColors, cardLightColors } from "@/constants";
import { ColorModeContext } from "@/providers/colormode-context";
import { propertyReferralsInfo } from "./constants";

export const PropertyReferrals = () => {
  const { mode } = useContext(ColorModeContext);

  return (
    <Stack
      bgcolor={mode == "dark" ? cardDarkColors.bg : cardLightColors.bg}
      color={mode === "dark" ? cardDarkColors.color : cardLightColors.color}
      borderRadius={cardBorderRadius}
      justifyContent="space-between"
      height="100%"
      gap={2}
      p={2}
    >
      <Typography variant="body1" fontWeight={600}>
        PropertyReferrals
      </Typography>

      {propertyReferralsInfo.map(({ title, percentage, color }) => (
        <Stack gap={1} key={title}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" fontWeight={600}>
              {title}
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {percentage}%
            </Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={percentage}
            valueBuffer={100}
            sx={{
              borderRadius: 1,
              height: 6,
              ".MuiLinearProgress-bar": { bgcolor: color },
            }}
          />
        </Stack>
      ))}
    </Stack>
  );
};
