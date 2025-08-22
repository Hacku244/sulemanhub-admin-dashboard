import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { tokens } from "../../theme";

// ICONS
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { purple } from "@mui/material/colors";

/** Layout constants */
const EXPANDED_WIDTH = 264;
const COLLAPSED_WIDTH = 88;
const MOBILE_EXPANDED_RATIO = 0.3;   // 30% of screen width
const PHONE_EXPANDED_RATIO = 0.13;   // 13% of screen width

/** Spring motion */
const SPRING = { type: "spring", stiffness: 230, damping: 40 };

/** Profile Data */
const profile = {
  name: "Raja Suleman",
  role: "Founder of SulemanHub",
  avatar: "../../assets/user.jpg",
};

/** Nav Item */
const NavItem = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  isExpanded,
  onClick,
  selectOnClick = true,
  afterIcon,
}) => {
  const theme = useTheme();
  const labelColor =
    selected === title ? theme.palette.common.white : theme.palette.text.primary;

  const content = (
    <motion.div whileHover={{ x: 6 }} transition={SPRING}>
      <Box
        component={to ? Link : "div"}
        to={to}
        onClick={() => {
          if (selectOnClick) setSelected(title);
          if (onClick) onClick();
        }}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          textDecoration: "none",
          cursor: "pointer",
          px: 1.75,
          py: 1.9,
          my: 1.25,
          borderRadius: 2,
          overflow: "hidden",
          whiteSpace: "nowrap",
          bgcolor:
            selected === title ? theme.palette.primary.main : "transparent",
          color: labelColor,
          "&:hover": {
            bgcolor:
              selected === title
                ? theme.palette.primary.main
                : theme.palette.primary.light,
            color: theme.palette.common.white,
          },
        }}
      >
        <Box display="flex" alignItems="center" gap={2}  >
          {icon}
          {isExpanded && (
            <Typography
              variant="body1"
              fontWeight={500}
              sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
            >
              {title}
            </Typography>
          )}
        </Box>
        {isExpanded && afterIcon && <Box ml={1}>{afterIcon}</Box>}
      </Box>
    </motion.div>
  );

  return isExpanded ? (
    content
  ) : (
    <Tooltip title={title} placement="right" arrow>
      <Box>{content}</Box>
    </Tooltip>
  );
};

/** Dropdown Menu */
const DropdownMenu = ({
  title,
  icon,
  items,
  isExpanded,
  selected,
  setSelected,
  defaultOpen = false,
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <>
      <NavItem
        title={title}
        icon={icon}
        selected={selected}
        setSelected={setSelected}
        isExpanded={isExpanded}
        onClick={() => setOpen((v) => !v)}
        selectOnClick={false}
        afterIcon={
          isExpanded && (
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={SPRING}
            >
              {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </motion.div>
          )
        }
      />
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.28 }}
          >
            <Box ml={isExpanded ? 4 : 0}>
              {items.map((sub, i) => (
                <NavItem
                  key={i}
                  title={sub.title}
                  to={sub.to}
                  icon={sub.icon}
                  selected={selected}
                  setSelected={setSelected}
                  isExpanded={isExpanded}
                />
              ))}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/** Sidebar Content */
const SidebarContent = ({ expanded, setExpanded, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isTablet = useMediaQuery("(max-width: 768px)");
  const isMobile = useMediaQuery("(max-width: 400px)");

  const computedWidth = expanded
    ? isMobile
      ? window.innerWidth * PHONE_EXPANDED_RATIO
      : isTablet
      ? window.innerWidth * MOBILE_EXPANDED_RATIO
      : EXPANDED_WIDTH
    : COLLAPSED_WIDTH;

  return (
    <motion.aside
      animate={{ width: computedWidth }}
      transition={SPRING}
      style={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        background: colors.primary[400],
        color: theme.palette.common.white,
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1200,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent={expanded ? "space-between" : "center"}
        px={2}
        py={2}
      >
        {expanded && (
          <Typography variant="h4" sx={{ color: "blueviolet" }}>
            SulemanHub
          </Typography>
        )}
        <IconButton onClick={() => setExpanded((v) => !v)}>
          <MenuOutlinedIcon sx={{ color: "blueviolet" }} />
        </IconButton>
      </Box>

      {/* Profile */}
      {expanded && (
        <Box textAlign="center" mb={2} px={2} mt={2}>
          <motion.img
            src={profile.avatar}
            alt="profile"
            width="96"
            height="96"
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              overflow: "hidden",
            }}
            whileHover={{ scale: 1.06 }}
            transition={SPRING}
          />
          <Typography
            variant="h6"
            mt={1}
            fontWeight="bold"
            sx={{ color: purple[700], fontSize: "1.5rem" }}
          >
            {profile.name}
          </Typography>
          <Typography
            variant="body2"
            fontWeight="bold"
            sx={{ color: purple[700], fontSize: "1.2rem" }}
          >
            {profile.role}
          </Typography>
        </Box>
      )}

      {/* Menu */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 1,
          pb: expanded ? 2 : 0,
          mb: 2,
        }}
      >
        <NavItem
          title="Dashboard"
          to="/"
          icon={<HomeOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
          isExpanded={expanded}
        />

        {expanded && (
          <Typography
            variant="subtitle2"
            px={2}
            mt={2}
            mb={2}
            sx={{ color: "blueviolet" , fontWeight:"bold"}}
          >
            Data
          </Typography>
        )}
        <NavItem
          title="Manage Team"
          to="/team"
          icon={<PeopleOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
          isExpanded={expanded}
        />
        <NavItem
          title="Contacts"
          to="/contacts"
          icon={<ContactsOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
          isExpanded={expanded}
        />
        <NavItem
          title="Invoices"
          to="/invoices"
          icon={<ReceiptOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
          isExpanded={expanded}
        />

        {expanded && (
          <Typography
            variant="subtitle2"
            px={2}
            mt={2}
            mb={1}
            sx={{ color: "blueviolet" , fontWeight:"bold"}}
          >
            Pages
          </Typography>
        )}
        <NavItem
          title="Profile Form"
          to="/form"
          icon={<PersonOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
          isExpanded={expanded}
        />
        <NavItem
          title="Calendar"
          to="/calendar"
          icon={<CalendarTodayOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
          isExpanded={expanded}
        />
        <NavItem
          title="FAQ Page"
          to="/faq"
          icon={<HelpOutlineOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
          isExpanded={expanded}
        />

        {expanded && (
          <Typography
            variant="subtitle2"
            px={2}
            mt={2}
            mb={1}
            sx={{ color: "blueviolet" , fontWeight:"bold" }}
          >
            Charts
          </Typography>
        )}
        <DropdownMenu
          title="Charts"
          icon={<BarChartOutlinedIcon />}
          isExpanded={expanded}
          selected={selected}
          setSelected={setSelected}
          items={[
            { title: "Bar Chart", to: "/bar", icon: <BarChartOutlinedIcon /> },
            { title: "Pie Chart", to: "/pie", icon: <PieChartOutlinedIcon /> },
            { title: "Line Chart", to: "/line", icon: <TimelineOutlinedIcon /> },
            {
              title: "Geography Chart",
              to: "/geography",
              icon: <MapOutlinedIcon />,
            },
          ]}
        />
      </Box>
    </motion.aside>
  );
};

/** Wrapper */
const MySidebar = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [expanded, setExpanded] = useState(!isMobile); // collapsed by default on mobile
  const [selected, setSelected] = useState("Dashboard");

  useEffect(() => {
    setExpanded(!isMobile); // auto-collapse when switching to mobile
  }, [isMobile]);

  const sidebarWidth = expanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH;
  const spacerStyle = useMemo(
    () => ({
      width: sidebarWidth,
      flexShrink: 0,
    }),
    [sidebarWidth]
  );

  return (
    <>
      <SidebarContent
        expanded={expanded}
        setExpanded={setExpanded}
        selected={selected}
        setSelected={setSelected}
      />
      <Box sx={spacerStyle} />
    </>
  );
};

export default MySidebar;
