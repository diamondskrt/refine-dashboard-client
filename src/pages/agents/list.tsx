import { useList } from "@refinedev/core";
import { Box, Stack, Typography } from "@mui/material";
import { AgentCard } from "@/components";

export const AgentList = () => {
  const {
    data: allAgents,
    isLoading,
    isError,
  } = useList({ resource: "users" });

  if (isLoading) return <Typography>Loading...</Typography>;

  if (isError) return <Typography>Something went wrong...</Typography>;

  return (
    <Box>
      <Typography variant="h5" fontWeight={600}>
        Agent List
      </Typography>

      <Stack mt={6} gap={2}>
        {allAgents?.data.length ? (
          allAgents.data.map((agent) => (
            <AgentCard
              key={agent._id}
              id={agent._id}
              name={agent.name}
              email={agent.email}
              avatar={agent.avatar}
              propertiesCount={agent.allProperties.length}
            />
          ))
        ) : (
          <Typography variant="body1" p={2}>
            There are no agents
          </Typography>
        )}
      </Stack>
    </Box>
  );
};
