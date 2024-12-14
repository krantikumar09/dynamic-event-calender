import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

// Create a context for event data
export const EventContext = createContext();

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Event categories with color codes
  const eventCategories = [
    { name: "Work", color: "#3498db" }, // Blue
    { name: "Personal", color: "#e74c3c" }, // Red
    { name: "Others", color: "#2ecc71" }, // Green
  ];

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(savedEvents);
  }, []);

  const handleDayClick = (date) => {
    const formattedDate = formatDate(date);
    setSelectedDay(formattedDate);
  };

  const getEventsForSelectedDay = () => {
    if (!selectedDay) return [];
    return events.filter((event) => event.date === selectedDay);
  };

  const addEventToStorage = (newEvent) => {
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const deleteEventFromStorage = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const editEvent = (updatedEvent) => {
    const newEvents = events.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event
    );
    setEvents(newEvents);
    localStorage.setItem("events", JSON.stringify(newEvents));
  };

  const handleMonthNavigation = (direction) => {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() + direction))
    );
  };

  const getEventColorForDay = (date) => {
    const eventsOnDay = events.filter((event) => event.date === date);
    return eventsOnDay.length > 0 ? eventsOnDay[0].categoryColor : null;
  };

  const exportEventsToJSON = () => {
    const eventsForMonth = events.filter(
      (event) =>
        new Date(event.date).getMonth() === currentMonth.getMonth() &&
        new Date(event.date).getFullYear() === currentMonth.getFullYear()
    );
    const blob = new Blob([JSON.stringify(eventsForMonth)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `events_${currentMonth.toLocaleString("default", {
      month: "long",
    })}.json`;
    link.click();
  };

  const exportEventsToCSV = () => {
    const eventsForMonth = events.filter(
      (event) =>
        new Date(event.date).getMonth() === currentMonth.getMonth() &&
        new Date(event.date).getFullYear() === currentMonth.getFullYear()
    );
    const header = [
      "ID",
      "Name",
      "Description",
      "Start Time",
      "End Time",
      "Category",
      "Date",
    ];
    const rows = eventsForMonth.map((event) => [
      event.id,
      event.name,
      event.description,
      event.startTime,
      event.endTime,
      event.category,
      event.date,
    ]);

    let csvContent = header.join(",") + "\n";
    rows.forEach((row) => {
      csvContent += row.join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `events_${currentMonth.toLocaleString("default", {
      month: "long",
    })}.csv`;
    link.click();
  };

  return (
    <EventContext.Provider
      value={{
        events,
        selectedDay,
        handleDayClick,
        getEventsForSelectedDay,
        addEventToStorage,
        deleteEventFromStorage,
        editEvent,
        showEventModal,
        setShowEventModal,
        eventToEdit,
        setEventToEdit,
        handleMonthNavigation,
        currentMonth,
        setEvents,
        eventCategories,
        getEventColorForDay,
        exportEventsToJSON,
        exportEventsToCSV,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
