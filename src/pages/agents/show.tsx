import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { useOne } from "@refinedev/core";
import { Profile } from "@/components";

export const AgentShow = () => {
  const { id } = useParams();

  const {
    data: user,
    isLoading,
    isError,
  } = useOne({
    resource: "users",
    id: id,
  });

  if (isLoading) return <Typography>Loading...</Typography>;

  if (isError) return <Typography>Something went wrong...</Typography>;

  return <Profile userData={user.data} />;
};
