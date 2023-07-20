import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
} from "@refinedev/mui";
import dataProvider from "@refinedev/simple-rest";
import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import {
  GridViewRounded,
  TextsmsOutlined,
  PeopleAltOutlined,
  StarHalfOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { ThemedLayoutV2 } from "@/components/refine/layout";
import { authProvider, ColorModeContextProvider } from "@/providers";
import {
  PropertyList,
  PropertyShow,
  PropertyCreate,
  PropertyEdit,
} from "@/pages/properties";
import { AgentList, AgentProfile, AgentShow } from "@/pages/agents";
import { Home } from "@/pages/home";
import { Login } from "@/pages/login";

function App() {
  const menuItems = [
    {
      name: "",
      list: Home,
      options: {
        label: "Dashboard",
      },
      icon: <GridViewRounded />,
    },
    {
      name: "properties",
      list: PropertyList,
      create: PropertyCreate,
      show: PropertyShow,
      edit: PropertyEdit,
      icon: <SettingsOutlined />,
    },
    {
      name: "agents",
      list: AgentList,
      show: AgentShow,
      icon: <PeopleAltOutlined />,
    },
    {
      name: "review",
      icon: <StarHalfOutlined />,
    },
    {
      name: "message",
      icon: <TextsmsOutlined />,
    },
  ];

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider(`${import.meta.env.VITE_BASE_URL}/v1`)}
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              resources={menuItems}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                      <ThemedLayoutV2>
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route index element={<Home />} />
                  <Route path="/properties">
                    <Route index element={<PropertyList />} />
                    <Route path="create" element={<PropertyCreate />} />
                    <Route path="edit/:id" element={<PropertyEdit />} />
                    <Route path="show/:id" element={<PropertyShow />} />
                  </Route>
                  <Route path="/agents">
                    <Route index element={<AgentList />} />
                    <Route path="show/:id" element={<AgentShow />} />
                    <Route path="profile" element={<AgentProfile />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
                <Route
                  element={
                    <Authenticated fallback={<Outlet />}>
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login />} />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
