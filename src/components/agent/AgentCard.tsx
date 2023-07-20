import { useContext } from "react";
import { Link } from "react-router-dom";
import { useGetIdentity } from "@refinedev/core";
import { Avatar, Box, Card, Typography } from "@mui/material";
import { cardDarkColors, cardLightColors } from "@/constants";
import { IUser } from "@/interfaces/user";
import { ColorModeContext } from "@/providers/colormode-context";
import { AgentCardProps } from "./types";

export const AgentCard: React.FC<AgentCardProps> = ({
  id,
  name,
  email,
  avatar,
  propertiesCount,
}) => {
  const { data: user } = useGetIdentity<IUser>();

  const { mode } = useContext(ColorModeContext);

  const getLink = () => {
    return user?.email === email ? "profile" : `show/${id}`;
  };

  return (
    <Card
      component={Link}
      to={getLink()}
      sx={{
        bgcolor: mode === "dark" ? cardDarkColors.bg : cardLightColors.bg,
        color: mode === "dark" ? cardDarkColors.color : cardLightColors.color,
        p: 2,
        boxShadow: "none",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width={{
          sx: "100%",
          md: "70%",
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar src={avatar} />
          <Box>
            <Typography variant="body1">{name}</Typography>
            <Typography variant="body2" color="grey">
              {email}
            </Typography>
          </Box>
        </Box>

        <Box display="flex">
          <Typography variant="body2" color="grey">
            Properties: {propertiesCount}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
