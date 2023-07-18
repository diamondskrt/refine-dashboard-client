import { useContext } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Stack, Typography } from '@mui/material';
import { ColorModeContext } from '@/providers/colormode-context';
import { PieChartProps } from './types';
import { cardBorderRadius, cardDarkColors, cardLightColors } from '@/constants';

export const PieChart: React.FC<PieChartProps> = ({
  title,
  value,
  series,
  colors,
}) => {
  const { mode } = useContext(ColorModeContext);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      gap={2}
      bgcolor={mode == 'dark' ? cardDarkColors.bg : cardLightColors.bg}
      color={mode === 'dark' ? cardDarkColors.color : cardLightColors.color}
      borderRadius={cardBorderRadius}
      pl={3}
      py={2}
    >
      <Stack>
        <Typography variant="body2">{title}</Typography>
        <Typography variant="h6" fontWeight={600}>
          {value}
        </Typography>
      </Stack>

      <ReactApexChart
        options={{
          chart: {
            type: 'donut',
          },
          colors,
          legend: {
            show: false,
          },
          dataLabels: {
            enabled: false,
          },
        }}
        series={series}
        type="donut"
        width={120}
      />
    </Box>
  );
};
