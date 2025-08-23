
import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Modal,
  TextField,
  MenuItem,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { CSVLink } from "react-csv";
import { useReactToPrint } from "react-to-print";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery("(max-width:900px)");
  const [currentEvents, setCurrentEvents] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const calendarRef = useRef(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventCategory, setEventCategory] = useState("General");

  // Export CSV
  const csvData = currentEvents.map((event) => ({
    title: event.title,
    start: event.start,
    end: event.end || "",
    allDay: event.allDay,
    category: event.extendedProps?.category || "General",
  }));

  // Print Calendar
  const handlePrint = useReactToPrint({
    content: () => calendarRef.current,
  });

  const getEventColor = (category) => {
    switch (category) {
      case "Meeting":
        return colors.blueAccent[400];
      case "Task":
        return colors.greenAccent[400];
      case "Deadline":
        return colors.redAccent[400];
      default:
        return colors.orangeAccent[400];
    }
  };

  const handleDateClick = (selected) => {
    setSelectedDate(selected);
    setModalOpen(true);
  };

  const handleEventClick = (selected) => {
    if (window.confirm(`Delete the event '${selected.event.title}'?`)) {
      selected.event.remove();
    }
  };

  const handleAddEvent = () => {
    if (!eventTitle) {
      alert("Please enter a title");
      return;
    }

    if (eventCategory === "General") {
      alert("Please select a category other than 'General'");
      return;
    }

    if (selectedDate) {
      const calendarApi = selectedDate.view?.calendar || calendarRef.current.getApi();
      calendarApi.unselect();
      calendarApi.addEvent({
        id: `${selectedDate.dateStr || selectedDate.startStr}-${eventTitle}`,
        title: eventTitle,
        start: selectedDate.dateStr || selectedDate.startStr,
        end: selectedDate.endStr || null,
        allDay: selectedDate.allDay ?? true,
        color: getEventColor(eventCategory),
        extendedProps: { category: eventCategory },
      });
      setModalOpen(false);
      setEventTitle("");
      setEventCategory("General");
    }
  };

  const categories = ["Meeting", "Task", "Deadline"];

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Interactive Full Calendar" />

      {/* Export & Print Buttons */}
      <Box mb={2} display="flex" gap={2} flexWrap="wrap">
        <Button variant="contained">
          <CSVLink
            data={csvData}
            filename={"calendar_events.csv"}
            style={{ color: "white", textDecoration: "none" }}
          >
            Export CSV
          </CSVLink>
        </Button>
        <Button variant="contained" onClick={handlePrint}>
          Print Calendar
        </Button>
      </Box>

      <Box display="flex" flexDirection={isMobile ? "column" : "row"} gap={2}>
        {isMobile && (
          <Button
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "Hide Events" : "Show Events"}
          </Button>
        )}

        {/* CALENDAR SIDEBAR */}
        {(!isMobile || sidebarOpen) && (
          <Box
            flex={isMobile ? "1 1 100%" : "1 1 25%"}
            backgroundColor={colors.primary[400]}
            p="15px"
            borderRadius="8px"
          >
            {/* CATEGORY LEGEND */}
            <Box mb={2} display="flex" gap={1} flexWrap="wrap">
              {categories.map((cat) => (
                <Box
                  key={cat}
                  display="flex"
                  alignItems="center"
                  gap={0.5}
                  sx={{
                    backgroundColor: colors.primary[500],
                    p: 0.5,
                    borderRadius: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 14,
                      height: 14,
                      backgroundColor: getEventColor(cat),
                      borderRadius: "50%",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color:
                        theme.palette.mode === "light"
                          ? colors.grey[700]
                          : colors.grey[100],
                    }}
                  >
                    {cat}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Typography
              variant="h5"
              mb={2}
              sx={{ color: colors.blueAccent[400], fontWeight: "bold" }}
            >
              Events
            </Typography>
            <List>
              {currentEvents.map((event) => (
                <ListItem
                  key={event.id}
                  sx={{
                    backgroundColor:
                      event.backgroundColor || colors.greenAccent[500],
                    margin: "8px 0",
                    borderRadius: "6px",
                    boxShadow: `0 2px 4px ${colors.primary[500]}88`,
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" color={colors.grey[500]}>
                        {event.title}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color={colors.grey[500]}>
                        {new Date(event.start).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* CALENDAR */}
        <Box flex={isMobile ? "1 1 100%" : "1 1 75%"}>
          <div ref={calendarRef}>
            <FullCalendar
              height="75vh"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              select={handleDateClick}        //  for drag select (desktop)
              dateClick={handleDateClick}     //  for single tap (mobile/tablet)
              eventClick={handleEventClick}
              eventsSet={(events) => setCurrentEvents(events)}
              nowIndicator={true}
              dayCellClassNames={(dateInfo) =>
                dateInfo.isToday ? "fc-today-highlight" : ""
              }
              initialEvents={[
                {
                  id: "1",
                  title: "All-day Meeting",
                  date: "2022-09-14",
                  color: getEventColor("Meeting"),
                  extendedProps: { category: "Meeting" },
                },
                {
                  id: "2",
                  title: "Task Review",
                  date: "2022-09-28",
                  color: getEventColor("Task"),
                  extendedProps: { category: "Task" },
                },
              ]}
            />
          </div>
        </Box>
      </Box>

      {/* Event Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: colors.primary[400],
            p: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6" color={colors.grey[100]}>
            Add Event
          </Typography>
          <TextField
            label="Title"
            variant="outlined"
            size="small"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            fullWidth
          />
          <TextField
            select
            label="Category"
            value={eventCategory}
            onChange={(e) => setEventCategory(e.target.value)}
            fullWidth
            size="small"
          >
            {["General", ...categories].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" onClick={handleAddEvent}>
            Add Event
          </Button>
        </Box>
      </Modal>

      <style>
        {`
          .fc-today-highlight {
            background-color: ${colors.blueAccent[600]}33 !important;
            border-radius: 4px;
          }
        `}
      </style>
    </Box>
  );
};

export default Calendar;
