import { createContext, useState, useEffect } from "react";
import { saveAs } from "file-saver";

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
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
