import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NubaLogo } from "@/public/assets/nuba-logo";
import { cn, formatDate } from "@/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar } from "@mui/material";
import { PointIcon } from "@/assets/svg/point-icon";
import { supportList, sideListItems } from "@/components/sidebar/constants";
import { useGetUserProfileQuery } from "@/redux/features/userApiSlice";
import UserInfoSkeleton from "../dashboard/skeletons/user-info-skeleton";
import Image from "next/image";
import verified from "@/assets/jpg/verified.jpeg";
import { LogoutIcon } from "@/assets/svg/logout-icon";
import { resetSignup } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";

const drawerWidth = 260;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open
    ? {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": {
          ...openedMixin(theme),
          backgroundColor: "black",
          color: "white",
          paddingLeft: "16px",
          paddingRight: "16px",
          backgroundImage: "url('/assets/sidebar-bg.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
        },
      }
    : {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": {
          ...closedMixin(theme),
          backgroundColor: "black",
          color: "white",
          paddingLeft: "16px",
          paddingRight: "16px",
          backgroundImage: "url('/assets/sidebar-bg.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
        },
      }),
}));

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [showLogout, setShowLogout] = React.useState<boolean>(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { data: userProfileDetails, isLoading: isProfileDetailsLoading } =
    useGetUserProfileQuery();
  const userProfile = userProfileDetails?.data;
  const handleLogout = () => {
    dispatch(resetSignup());
    router.push("/");
  };
  return (
    <Box sx={{ display: "flex" }}>
      {/* <CssBaseline /> */}
      <AppBar
        sx={{
          backgroundColor: "black",
          height: "80px",
        }}
        position="fixed"
        open={open}
      >
        <Toolbar
          sx={{
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{ fontWeight: 700 }}
              variant="h6"
              noWrap
              component="div"
            >
              {formatDate(new Date())}
            </Typography>
          </Box>
          {isProfileDetailsLoading ? (
            <UserInfoSkeleton />
          ) : (
            <Box className="flex items-center gap-2">
              {/* <IconButton
                size="small"
                aria-label="Notifications"
                color="inherit"
                sx={{ mr: 2 }}
              >
                <NotificationIcon />
              </IconButton> */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PointIcon />
                <p className="font-[700] text-[#CF931D]">
                  {userProfile?.statistics.unitsEarned} pts
                </p>
              </Box>
              <Avatar sx={{ width: "20px", height: "20px" }} />
              <p className="font-[700] text-white">
                {userProfile?.firstName} {userProfile?.lastName}
              </p>
              {userProfile?.isKycVerified && (
                <Image src={verified} alt="verified" className="w-4 h-4" />
              )}
              {/* <div className="relative w-auto">
                <button onClick={() => setShowLogout(!showLogout)}>
                  <DropdownIcon />
                </button>
                {showLogout && (
                  <div className="absolute px-4 py-1 top-8 right-5 text-white rounded-[8px]">
                    <LogoutButton />
                  </div>
                )}
              </div> */}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer sx={{ px: 5 }} variant="permanent" open={open}>
        <DrawerHeader
          sx={{
            width: "100%",
            display: "flex",
            height: "80px",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => router.push("/")}
            className="flex w-full items-center justify-center  "
          >
            <NubaLogo fill="white" />
          </button>
        </DrawerHeader>

        <List>
          <button
            className={cn(open ? "flex" : "hidden", "w-full mt-10 pl-2 mb-4 ")}
            onClick={handleDrawerClose}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
            <p>Collapse Menu </p>
          </button>
          {sideListItems.map((item, index) => {
            const isActive = pathname.includes(item.route);

            return (
              <Link key={index} href={item.route} passHref>
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={[
                      {
                        minHeight: 50,
                        color: isActive ? "black" : "white",
                        backgroundColor: isActive ? "white" : "transparent",
                        borderRadius: isActive ? "8px" : 0,
                        "&:hover": {
                          backgroundColor: isActive
                            ? "white"
                            : "rgba(255, 255, 255, 0.1)",
                        },
                      },
                      open
                        ? {
                            justifyContent: "initial",
                          }
                        : {
                            justifyContent: "center",
                          },
                    ]}
                  >
                    <ListItemIcon
                      sx={[
                        {
                          minWidth: 0,
                          justifyContent: "center",
                          color: isActive ? "black" : "white",
                        },
                        open
                          ? {
                              mr: 3,
                            }
                          : {
                              mr: "auto",
                            },
                      ]}
                    >
                      <item.Icon fill={isActive ? "black" : ""} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      sx={[
                        {
                          opacity: open ? 1 : 0,
                        },
                      ]}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            );
          })}
        </List>
        <List sx={{ mt: 5 }}>
          {supportList.map((item, index) => {
            const isActive = pathname.includes(item.route);

            return (
              <Link key={index} href={item.route} passHref>
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={[
                      {
                        minHeight: 50,
                        color: isActive ? "black" : "white",
                        backgroundColor: isActive ? "white" : "transparent",
                        borderRadius: isActive ? "8px" : 0,
                        "&:hover": {
                          backgroundColor: isActive
                            ? "white"
                            : "rgba(255, 255, 255, 0.1)",
                        },
                      },
                      open
                        ? {
                            justifyContent: "initial",
                          }
                        : {
                            justifyContent: "center",
                          },
                    ]}
                  >
                    <ListItemIcon
                      sx={[
                        {
                          minWidth: 0,
                          justifyContent: "center",
                          color: isActive ? "black" : "white",
                        },
                        open
                          ? {
                              mr: 3,
                            }
                          : {
                              mr: "auto",
                            },
                      ]}
                    >
                      <item.Icon />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      sx={[
                        {
                          opacity: open ? 1 : 0,
                        },
                      ]}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            );
          })}
        </List>
        <List sx={{ mt: 5 }}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={handleLogout}
              sx={[
                {
                  minHeight: 50,
                  color: "red",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "red",
                    color: "white",
                  },
                },
                open
                  ? {
                      justifyContent: "initial",
                    }
                  : {
                      justifyContent: "center",
                    },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: "center",
                    color: "black",
                  },
                  open
                    ? {
                        mr: 3,
                      }
                    : {
                        mr: "auto",
                      },
                ]}
              >
                <LogoutIcon fill="red" />
              </ListItemIcon>
              <ListItemText
                primary="Log out"
                sx={[
                  {
                    opacity: open ? 1 : 0,
                  },
                ]}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          mt: 10,
          width: `${
            open ? `calc(100vw - ${drawerWidth}px)` : `calc(100vw - 65px)`
          }`,
        }}
      >
        <DrawerHeader className="bg-[#FAFAFA]  ">{children}</DrawerHeader>
      </Box>
    </Box>
  );
}
