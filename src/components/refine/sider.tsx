import React, { CSSProperties, useContext, useState } from "react";
import {
  CanAccess,
  ITreeMenu,
  useIsExistAuthentication,
  useLogout,
  useTitle,
  useTranslate,
  useRouterContext,
  useRouterType,
  useLink,
  useMenu,
  useRefineContext,
  useActiveAuthProvider,
  pickNotDeprecated,
  useWarnAboutChange,
  useGetIdentity,
} from "@refinedev/core";
import {
  ThemedTitleV2 as DefaultTitle,
  useThemedLayoutContext,
} from "@refinedev/mui";
import {
  KeyboardArrowRightRounded,
  KeyboardArrowLeftRounded,
  Dashboard,
  ExpandLess,
  ExpandMore,
  ListOutlined,
  Logout,
  LightModeOutlined,
  DarkModeOutlined,
} from "@mui/icons-material";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { RefineThemedLayoutV2SiderProps } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { AppIcon } from "@/components";
import { ColorModeContext } from "@/providers/colormode-context";
import { IUser } from "@/interfaces/user";
import { useNavigate } from "react-router-dom";

export const ThemedSiderV2: React.FC<RefineThemedLayoutV2SiderProps> = ({
  Title: TitleFromProps,
  render,
  meta,
  activeItemDisabled = false,
}) => {
  const {
    siderCollapsed,
    setSiderCollapsed,
    mobileSiderOpen,
    setMobileSiderOpen,
  } = useThemedLayoutContext();

  const drawerWidth = () => {
    if (siderCollapsed) return 56;
    return 240;
  };

  const t = useTranslate();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();
  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;
  const { hasDashboard } = useRefineContext();
  const translate = useTranslate();

  const { menuItems, selectedKey, defaultOpenKeys } = useMenu({ meta });
  const isExistAuthentication = useIsExistAuthentication();
  const TitleFromContext = useTitle();
  const authProvider = useActiveAuthProvider();
  const { warnWhen, setWarnWhen } = useWarnAboutChange();
  const { mutate: mutateLogout } = useLogout({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const [open, setOpen] = useState<{ [k: string]: any }>({});
  const { mode, setMode } = useContext(ColorModeContext);
  const navigate = useNavigate();
  const { data: user } = useGetIdentity<IUser>();

  React.useEffect(() => {
    setOpen((previous) => {
      const previousKeys: string[] = Object.keys(previous);
      const previousOpenKeys = previousKeys.filter((key) => previous[key]);

      const uniqueKeys = new Set([...previousOpenKeys, ...defaultOpenKeys]);
      const uniqueKeysRecord = Object.fromEntries(
        Array.from(uniqueKeys.values()).map((key) => [key, true])
      );
      return uniqueKeysRecord;
    });
  }, [defaultOpenKeys]);

  const RenderToTitle =
    TitleFromProps ?? AppIcon ?? TitleFromContext ?? DefaultTitle;

  const handleClick = (key: string) => {
    setOpen({ ...open, [key]: !open[key] });
  };

  const goHome = () => {
    setMobileSiderOpen(false);
    navigate("/");
  };

  const renderTreeView = (tree: ITreeMenu[], selectedKey?: string) => {
    return tree.map((item: ITreeMenu) => {
      const { icon, label, route, name, children, parentName, meta, options } =
        item;
      const isOpen = open[item.key || ""] || false;

      const isSelected = item.key === selectedKey;
      const isNested = !(
        pickNotDeprecated(meta?.parent, options?.parent, parentName) ===
        undefined
      );

      if (children.length > 0) {
        return (
          <CanAccess
            key={item.key}
            resource={name.toLowerCase()}
            action="list"
            params={{
              resource: item,
            }}
          >
            <div key={item.key}>
              <Tooltip
                title={label ?? name}
                placement="right"
                disableHoverListener={!siderCollapsed}
                arrow
              >
                <ListItemButton
                  onClick={() => {
                    if (siderCollapsed) {
                      setSiderCollapsed(false);
                      if (!isOpen) {
                        handleClick(item.key || "");
                      }
                    } else {
                      handleClick(item.key || "");
                    }
                  }}
                  sx={{
                    pl: isNested ? 4 : 2,
                    justifyContent: "center",
                    marginTop: "8px",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      justifyContent: "center",
                      minWidth: "24px",
                      transition: "margin-right 0.3s",
                      marginRight: siderCollapsed ? "0px" : "12px",
                      color: "currentColor",
                    }}
                  >
                    {icon ?? <ListOutlined />}
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                      noWrap: true,
                      fontSize: "14px",
                    }}
                  />
                  {isOpen ? (
                    <ExpandLess
                      sx={{
                        color: "text.icon",
                      }}
                    />
                  ) : (
                    <ExpandMore
                      sx={{
                        color: "text.icon",
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
              {!siderCollapsed && (
                <Collapse
                  in={open[item.key || ""]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {renderTreeView(children, selectedKey)}
                  </List>
                </Collapse>
              )}
            </div>
          </CanAccess>
        );
      }

      const linkStyle: CSSProperties =
        activeItemDisabled && isSelected ? { pointerEvents: "none" } : {};

      return (
        <CanAccess
          key={item.key}
          resource={name.toLowerCase()}
          action="list"
          params={{ resource: item }}
        >
          <Tooltip
            title={label ?? name}
            placement="right"
            disableHoverListener={!siderCollapsed}
            arrow
          >
            <ListItemButton
              component={ActiveLink}
              to={route}
              selected={isSelected}
              style={linkStyle}
              onClick={() => {
                setMobileSiderOpen(false);
              }}
              sx={{
                pl: isNested ? 4 : 2,
                py: isNested ? 1.25 : 1,
                justifyContent: "center",
                color: isSelected ? "primary.main" : "text.primary",
              }}
            >
              <ListItemIcon
                sx={{
                  justifyContent: "center",
                  transition: "margin-right 0.3s",
                  marginRight: siderCollapsed ? "0px" : "12px",
                  minWidth: "24px",
                  color: "currentColor",
                }}
              >
                {icon ?? <ListOutlined />}
              </ListItemIcon>
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  noWrap: true,
                  fontSize: "14px",
                }}
              />
            </ListItemButton>
          </Tooltip>
        </CanAccess>
      );
    });
  };

  const dashboard = hasDashboard ? (
    <CanAccess resource="dashboard" action="list">
      <Tooltip
        title={translate("dashboard.title", "Dashboard")}
        placement="right"
        disableHoverListener={!siderCollapsed}
        arrow
      >
        <ListItemButton
          component={ActiveLink}
          to="/"
          selected={selectedKey === "/"}
          onClick={() => {
            setMobileSiderOpen(false);
          }}
          sx={{
            pl: 2,
            py: 1,
            justifyContent: "center",
            color: selectedKey === "/" ? "primary.main" : "text.primary",
          }}
        >
          <ListItemIcon
            sx={{
              justifyContent: "center",
              minWidth: "24px",
              transition: "margin-right 0.3s",
              marginRight: siderCollapsed ? "0px" : "12px",
              color: "currentColor",
              fontSize: "14px",
            }}
          >
            <Dashboard />
          </ListItemIcon>
          <ListItemText
            primary={translate("dashboard.title", "Dashboard")}
            primaryTypographyProps={{
              noWrap: true,
              fontSize: "14px",
            }}
          />
        </ListItemButton>
      </Tooltip>
    </CanAccess>
  ) : null;

  const handleLogout = () => {
    if (warnWhen) {
      const confirm = window.confirm(
        t(
          "warnWhenUnsavedChanges",
          "Are you sure you want to leave? You have unsaved changes."
        )
      );

      if (confirm) {
        setWarnWhen(false);
        mutateLogout();
      }
    } else {
      mutateLogout();
    }
  };

  const logout = isExistAuthentication && (
    <Tooltip
      title={t("buttons.logout", "Logout")}
      placement="right"
      disableHoverListener={!siderCollapsed}
      arrow
    >
      <ListItemButton
        key="logout"
        onClick={() => handleLogout()}
        sx={{
          justifyContent: "center",
        }}
      >
        <ListItemIcon
          sx={{
            justifyContent: "center",
            minWidth: "24px",
            transition: "margin-right 0.3s",
            marginRight: siderCollapsed ? "0px" : "12px",
            color: "currentColor",
          }}
        >
          <Logout />
        </ListItemIcon>
        <ListItemText
          primary={t("buttons.logout", "Logout")}
          primaryTypographyProps={{
            noWrap: true,
            fontSize: "14px",
          }}
        />
      </ListItemButton>
    </Tooltip>
  );

  const items = renderTreeView(menuItems, selectedKey);

  const renderSider = () => {
    if (render) {
      return render({
        dashboard,
        logout,
        items,
        collapsed: siderCollapsed,
      });
    }
    return (
      <>
        {dashboard}
        {items}
        {logout}
      </>
    );
  };

  const drawer = (
    <Stack justifyContent="space-between" sx={{ height: "100%" }}>
      <List
        disablePadding
        sx={{
          flexGrow: 1,
          paddingTop: "16px",
        }}
      >
        {renderSider()}
      </List>
    </Stack>
  );

  return (
    <>
      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth() },
          display: "flex",
          zIndex: (theme) => theme.zIndex.drawer,
        }}
      >
        <Drawer
          variant="temporary"
          elevation={2}
          open={mobileSiderOpen}
          onClose={() => setMobileSiderOpen(false)}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: {
              sm: "block",
              md: "none",
            },
            "& .MuiDrawer-paper": {
              backgroundImage: "none",
            },
          }}
        >
          <Box
            sx={{
              width: drawerWidth(),
            }}
          >
            <Box
              sx={{
                height: 64,
                display: "flex",
                alignItems: "center",
                paddingLeft: "16px",
                fontSize: "14px",
              }}
              onClick={goHome}
            >
              <RenderToTitle collapsed={false} />
            </Box>
            {drawer}
          </Box>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth(),
              overflow: "hidden",
              transition: "width 200ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
              borderRight: "none",
              boxShadow:
                "3px 0px 4px -1px rgba(0,0,0, .2), 0 4px 5px 0 rgba(0,0,0, .14), 0 1px 10px 0 rgba(0,0,0, .12)",
            },
          }}
          open
        >
          <Paper
            elevation={0}
            sx={{
              fontSize: "14px",
              width: "100%",
              height: 64,
              display: "flex",
              flexShrink: 0,
              alignItems: "center",
              justifyContent: siderCollapsed ? "center" : "space-between",
              paddingLeft: siderCollapsed ? 0 : "16px",
              paddingRight: siderCollapsed ? 0 : "8px",
              variant: "outlined",
              borderRadius: 0,
            }}
          >
            <Link to="/">
              <RenderToTitle collapsed={siderCollapsed} />
            </Link>
          </Paper>
          <Box
            sx={{
              flexGrow: 1,
              overflowX: "hidden",
              overflowY: "auto",
            }}
          >
            {drawer}
          </Box>
          <Box>
            <Stack direction="row" justifyContent="space-between">
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  p: 1,
                  backgroundColor: "primary.main",
                  color: "white",
                }}
              >
                <IconButton
                  color="inherit"
                  onClick={() => {
                    setMode();
                  }}
                >
                  {mode === "dark" ? (
                    <LightModeOutlined />
                  ) : (
                    <DarkModeOutlined />
                  )}
                </IconButton>
              </Stack>

              {(user?.avatar || user?.name) && !siderCollapsed && (
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={1}
                  flexGrow={1}
                  sx={{
                    p: 1,
                    backgroundColor: "primary.main",
                    color: "white",
                    borderLeft: (theme) =>
                      `1px solid ${theme.palette.background.default}`,
                  }}
                >
                  <Avatar src={user?.avatar} alt={user?.name} />

                  {user?.given_name && (
                    <Typography
                      sx={{
                        display: {
                          xs: "none",
                          sm: "inline-block",
                        },
                      }}
                      variant="subtitle2"
                    >
                      {user.given_name}
                    </Typography>
                  )}
                </Stack>
              )}
            </Stack>
            <ListItemButton
              sx={{
                backgroundColor: "primary.main",
                color: "#fff",
                justifyContent: "center",
                transition: "0.3s",
                borderTop: (theme) =>
                  `1px solid ${theme.palette.background.default}`,
                "&:hover": {
                  backgroundColor: "primary.main",
                  opacity: 0.8,
                },
              }}
              onClick={() => setSiderCollapsed(!siderCollapsed)}
            >
              {siderCollapsed ? (
                <KeyboardArrowRightRounded />
              ) : (
                <>
                  <KeyboardArrowLeftRounded />
                  <Typography variant="body2">Collapse</Typography>
                </>
              )}
            </ListItemButton>
          </Box>
        </Drawer>
      </Box>
    </>
  );
};
