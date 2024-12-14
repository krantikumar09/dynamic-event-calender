import { Button } from "@/components/ui/button";
import React, { useContext } from "react";
import { EventContext } from "../Context/EventContext";

const Calendar = () => {
  const { currentMonth, handleDayClick, selectedDay, handleMonthNavigation } =
    useContext(EventContext);

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

  return (
    <div className="calendar-container">
      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-4">
        <Button
          onClick={() => handleMonthNavigation(-1)}
          variant="outline" size="icon"
        >
          Prev
        </Button>
        <h2 className="text-xl font-semibold">{formatMonthYear()}</h2>
        <Button
          onClick={() => handleMonthNavigation(1)}
          variant="outline" size="icon"
        >
          Next
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
          <div key={idx} className="text-center font-semibold">
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
            } hover:bg-gray-200 cursor-pointer py-2 px-4 rounded-lg text-center`}
            onClick={() => handleDayClick(new Date(year, month, day))}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
