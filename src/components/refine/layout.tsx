import React from "react";
import { ThemedLayoutContextProvider } from "@refinedev/mui";
import Box from "@mui/material/Box";
import type { RefineThemedLayoutV2Props } from "@refinedev/mui";
import { Header } from "../Header";
import { ThemedSiderV2 as Sider } from "./sider";

export const ThemedLayoutV2: React.FC<RefineThemedLayoutV2Props> = ({
  Footer,
  OffLayoutArea,
  children,
  initialSiderCollapsed,
}) => {
  return (
    <ThemedLayoutContextProvider initialSiderCollapsed={initialSiderCollapsed}>
      <Box display="flex" flexDirection="row">
        <Sider />
        <Box
          sx={[
            {
              display: "flex",
              flexDirection: "column",
              flex: 1,
              minHeight: "100vh",
            },
            { overflow: "auto" },
            { overflow: "clip" },
          ]}
        >
          <Header />
          <Box
            component="main"
            sx={{
              p: { xs: 1, md: 2, lg: 3 },
              flexGrow: 1,
              backgroundColor: "background.default",
            }}
          >
            {children}
          </Box>
          {Footer && <Footer />}
        </Box>
        {OffLayoutArea && <OffLayoutArea />}
      </Box>
    </ThemedLayoutContextProvider>
  );
};
