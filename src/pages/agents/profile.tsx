import { useGetIdentity, useOne } from "@refinedev/core";
import { Typography } from "@mui/material";
import { Profile } from "@/components";
import { IUser } from "@/interfaces/user";

export const AgentProfile = () => {
  const { data: user } = useGetIdentity<IUser>();

  const {
    data: currentUser,
    isLoading,
    isError,
  } = useOne({
    resource: "users",
    id: user?.id,
  });

  if (isLoading) return <Typography>Loading...</Typography>;

  if (isError) return <Typography>Something went wrong...</Typography>;

  return <Profile userData={currentUser.data} currentUser />;
};
