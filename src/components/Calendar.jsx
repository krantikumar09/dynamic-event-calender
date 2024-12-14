import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import { EventContext } from "../Context/EventContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Calendar = () => {
  const {
    events,
    currentMonth,
    handleDayClick,
    selectedDay,
    handleMonthNavigation,
  } = useContext(EventContext);
  const [eventsByDay, setEventsByDay] = useState({});

  // get the current month and year
  const month = currentMonth.getMonth();
  const year = currentMonth.getFullYear();

  const today = new Date();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const formatDate = (day) => {
    return new Date(year, month, day).toLocaleDateString("en-US", {
      weekday: "short", // "Sat"
      month: "short", // "Dec"
      day: "numeric", // "14"
      year: "numeric", // "2024"
    });
  };

  // Helper function to format the month and year
  const formatMonthYear = () => {
    return `${currentMonth.toLocaleString("default", {
      month: "long",
    })} ${year}`;
  };

  useEffect(() => {
    const eventsMap = {};

    events.forEach((event) => {
      const eventDate = new Date(event.date);
      const eventMonth = eventDate.getMonth();
      const eventYear = eventDate.getFullYear();

      // Only map events that belong to the current month and year
      if (eventMonth === month && eventYear === year) {
        const eventDay = eventDate.getDate();

        if (!eventsMap[eventDay]) {
          eventsMap[eventDay] = [];
        }
        eventsMap[eventDay].push(event);
      }
    });

    setEventsByDay(eventsMap);
  }, [currentMonth, events, month, year]);

  // Event category color coding
  const getEventCategoryColor = (category) => {
    switch (category) {
      case "work":
        return "bg-blue-500"; // Blue for work events
      case "personal":
        return "bg-green-500"; // Green for personal events
      case "others":
        return "bg-red-500"; // Red for others
      default:
        return "bg-gray-500"; // Default gray if no category
    }
  };

  return (
    <div className="calendar-container">
      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-4 md:mb-6 mx-4">
        <Button
          className="bg-transparent border-none outline-none text-black"
          onClick={() => handleMonthNavigation(-1)}
          variant="outline"
          size="icon"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </Button>
        <h2 className="text-base md:text-xl font-semibold text-black">
          {formatMonthYear()}
        </h2>
        <Button
          className="bg-transparent border-none outline-none text-black"
          onClick={() => handleMonthNavigation(1)}
          variant="outline"
          size="icon"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
          <div
            key={idx}
            className="text-sm text-center font-semibold text-slate-300"
          >
            {day}
          </div>
        ))}

        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={index} className="empty-cell"></div>
        ))}

        {days.map((day) => (
          <div
            key={day}
            className={`${
              today.getDate() === day &&
              today.getMonth() === month &&
              today.getFullYear() === year
                ? "bg-blue-500 text-white"
                : ""
            } ${
              formatDate(day) === selectedDay ? "border-2 border-blue-500" : ""
            } hover:bg-gray-200 cursor-pointer py-2 md:py-3 px-3.5 rounded-lg text-center`}
            onClick={() => handleDayClick(new Date(year, month, day))}
          >
            {day}
            {eventsByDay[day] && (
              <div className="flex justify-center mt-1">
                <div
                  className={`w-2 h-2 rounded-full ${getEventCategoryColor(
                    eventsByDay[day][0].category 
                  )}`}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
