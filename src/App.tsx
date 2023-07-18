import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
} from "@refinedev/mui";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import dataProvider from "@refinedev/simple-rest";
import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import {
  GridViewRounded,
  TextsmsOutlined,
  PeopleAltOutlined,
  StarHalfOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { Header } from "@/components";
import { ThemedLayoutV2 } from "@/components/refine";
import { ThemedSiderV2 } from "@/components/refine/sider";
import { ColorModeContextProvider } from "@/providers/colormode-context";
import { Login } from "@/pages/login";
import { Home } from "@/pages/home";
import { authProvider } from "@/providers";
import {
  PropertyList,
  PropertyShow,
  PropertyCreate,
  PropertyEdit,
} from "@/pages/properties";

function App() {
  const menuItems = [
    {
      name: "",
      options: {
        label: "Dashboard",
      },
      icon: <GridViewRounded />,
    },
    {
      name: "properties",
      list: PropertyList,
      create: PropertyCreate,
      icon: <SettingsOutlined />,
    },
    {
      name: "agent",
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
                      <ThemedLayoutV2
                        Header={() => <Header sticky />}
                        Sider={() => <ThemedSiderV2 />}
                      >
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
