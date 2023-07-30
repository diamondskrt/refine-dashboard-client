import { useEffect, useRef } from "react";
import { Box, Stack, Typography, Container } from "@mui/material";
import { useLogin } from "@refinedev/core";
import { AppIcon } from "@/components";
import { CredentialResponse } from "@/interfaces/google";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current)
        return;

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (res: CredentialResponse) => {
          if (res.credential) {
            login(res);
          }
        },
      });

      window.google.accounts.id.renderButton(divRef.current, {
        theme: "filled_black",
        size: "medium",
        shape: "pill",
        type: "standard",
      });
    }, []);

    return <div ref={divRef} />;
  };

  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack sx={{ textAlign: "center" }} spacing={2}>
        <AppIcon />
        <Typography variant="h5">Dashboard</Typography>
        <Box
          display="flex"
          gap="36px"
          justifyContent="center"
          flexDirection="column"
        >
          <GoogleButton />
        </Box>
      </Stack>
    </Container>
  );
};
