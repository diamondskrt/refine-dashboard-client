import { useContext } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { ArrowCircleUpRounded, MoreHoriz } from '@mui/icons-material';
import { cardBorderRadius, cardDarkColors, cardLightColors } from '@/constants';
import { ColorModeContext } from '@/providers/colormode-context';
import { totalRevenueOptions, totalRevenueSeries } from './constants';

export const TotalRevenue = () => {
  const { mode } = useContext(ColorModeContext);

  return (
    <Stack
      bgcolor={mode == 'dark' ? cardDarkColors.bg : cardLightColors.bg}
      color={mode === 'dark' ? cardDarkColors.color : cardLightColors.color}
      borderRadius={cardBorderRadius}
      p={2}
      gap={2}
    >
      <Stack gap={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body1" fontWeight={600}>
            Total Revenue
          </Typography>

          <IconButton aria-label="options" size="small">
            <MoreHoriz />
          </IconButton>
        </Box>

        <Box display="flex" alignItems="center" gap={5}>
          <Typography variant="h5" fontWeight={600}>
            $236,535
          </Typography>

          <Box display="flex" alignItems="center" gap={1}>
            <ArrowCircleUpRounded color="primary" />

            <Box>
              <Typography color="primary" variant="body1">
                0,8%
              </Typography>
              <Typography variant="caption" color="grey">
                Than Last Month
              </Typography>
            </Box>
          </Box>
        </Box>
      </Stack>

      <ReactApexChart
        series={totalRevenueSeries}
        type="bar"
        height={250}
        options={totalRevenueOptions}
      />
    </Stack>
  );
};
