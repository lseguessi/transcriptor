import React, { useEffect, useMemo, useState } from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import { useTranslation } from "next-i18next";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, Badge, Select, alpha } from "@mui/material";
import BalanceIcon from "@mui/icons-material/Balance";
import PlayLessonIcon from "@mui/icons-material/PlayLesson";
import SettingsIcon from "@mui/icons-material/Settings";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { googleLogout } from '@react-oauth/google';

import CachedIcon from "@mui/icons-material/Cached";
import jsonData from "@/_data/settings.json";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppStore } from "@/lib/store/appStore";
import { useSync } from "@/lib/hooks/useSyncHook";
import { clearSession, getCurrentLanguage, setLanguageStorage } from "@/lib/services/storage/app-storage";
import { useSearchParams } from "next/navigation";
import { ISyncResponse } from "@/lib/types/response/ISyncResponse";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid #D5D4DFCC",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const SearchIconWrapper2 = styled("div")(({ theme }) => ({
  position: "absolute",
  // pointerEvents: "none",
  cursor: 'pointer',
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: 12,
  top: 5,
  width: 27,
  height: 27,
  borderRadius: 50,
  backgroundColor: "#AD2517",
  color: '#fff'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "439px",
    },
  },
}));

const drawerWidth = 240;

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
  margin: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#ffffff",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    backgroundColor: "#ffffff",
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const LanguageSelect = styled(Select)`
  .MuiOutlinedInput-notchedOutline {
    border: 0;
  }
`;

export type PageWrapperProps = {
  title?: string;
};

export function PageWrapper({
  children,
}: React.PropsWithChildren<PageWrapperProps>) {
  const { t, i18n } = useTranslation('common');
  const { isUploading, isUploadCompleted, syncCurrent } = useAppStore()
  const searchParms = useSearchParams();
  const { makeRequest } = useSync()
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [textSearch, setTextSearch] = useState(searchParms.get("processNumber"));
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

    const [sync, setSync] = useState<ISyncResponse[] | null | undefined>()

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleLogout = () => {
    googleLogout();
    router.push("/login");
    clearSession();
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useMemo(() => {
    setTimeout(() => {
      makeRequest()
    }, 10000)
  }, [])

  useEffect(() => {
    setSync(syncCurrent)
  },[syncCurrent])

  useMemo(async () => {
    const curentlangStore = i18n.language// getCurrentLanguage();
    const langI18n = i18n.language
    if (curentlangStore != null && curentlangStore !== langI18n) {
      router.push(router.pathname, router.asPath, { locale: curentlangStore });
    }

  }, [router.pathname])

  const onSearch = () => {
    const rout = textSearch && textSearch !== '' ? '/transcripts?processNumber=' + textSearch : "/transcripts?searchAll=true";
    router.replace(rout)
  }

  console.log("syncCurrent, isUploadCompleted, isUploading", syncCurrent, isUploadCompleted, isUploading)
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>{t("MENU.PROFILE")}</MenuItem>
      <MenuItem onClick={handleLogout}>{t("MENU.LOGOUT")}</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>{t("MENU.PROFILE")}</p>
      </MenuItem>
    </Menu>
  );

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguageStorage(e.target.value);
    const locale = e.target.value;
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" color="transparent">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerClose}
            edge="start"
            sx={{
              marginRight: 5,
              ...(!open && { display: "none" }),
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <Avatar src="../images/justica.png" alt="logo" variant="square" />
          </IconButton>
          <Typography
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {t("title")}
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder={t('SEARCH_TEXT')}
              value={textSearch}
              onChange={(e) => setTextSearch(e.target.value)}
              inputProps={{ "aria-label": "search" }}
            />
            <SearchIconWrapper2 onClick={onSearch}>
              <NavigateNextIcon />
            </SearchIconWrapper2>
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <LanguageSelect
              labelId="language-select-label"
              id="language-select"
              value={router.locale}
              onChange={(e: any) => changeLanguage(e)}
              label="Idioma"
            >
              <MenuItem value="es">
                <img
                  style={{ width: 40 }}
                  src="../images/espanha.webp"
                  alt=""
                />
              </MenuItem>
              <MenuItem value="en">
                <img style={{ width: 40 }} src="../images/eua.webp" alt="" />
              </MenuItem>
              <MenuItem value="pt-BR">
                <img style={{ width: 40 }} src="../images/brasil.webp" alt="" />
              </MenuItem>
            </LanguageSelect>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={sync && sync?.length > 0 ? sync?.length : null} color="error">
                <CachedIcon sx={{ width: 36, height: 36 }} className={isUploading && !isUploadCompleted ? "girar-infinito" : ""} />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 46, height: 46 }}
              />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader />
        <Divider />
        <List>
          {jsonData.sidebar.map((menu, index) => (
            <Link href={menu.link} key={index}>
              <ListItem
                key={`key-list-${index}`}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {menu.icon === "justice" ? (
                      <BalanceIcon />
                    ) : menu.icon === "transcripts" ? (
                      <PlayLessonIcon />
                    ) : menu.icon === "settings" ? (
                      <SettingsIcon />
                    ) : (
                      <div />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={menu?.title ? t(`MENU.${menu?.title}`) : ""}
                    sx={{ opacity: open ? 1 : 0, fontSize: "1rem" }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
        className=""
        style={{ width: open ? "" : "" }}
      >
        <DrawerHeader />
        {children}
      </Box>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
