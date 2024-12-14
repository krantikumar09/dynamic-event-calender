import { useContext, useEffect, useState } from "react";
import { EventContext } from "../Context/EventContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";


const EventModal = () => {
  const {
    selectedDay,
    setShowEventModal,
    showEventModal,
    setEvents,
    events,
    setEventToEdit,
    eventToEdit,
    eventCategories,
  } = useContext(EventContext);

  useEffect(() => {
    if (eventToEdit) {
      setName(eventToEdit.name);
      setDescription(eventToEdit.description);
      setStartTime(eventToEdit.startTime);
      setEndTime(eventToEdit.endTime);
      setCategory(eventToEdit.category);
    }
  }, [eventToEdit]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [category, setCategory] = useState("Work");

  const handleSubmit = (e) => {
    e.preventDefault();

    const eventId = uuidv4();
    const newEvent = {
      id: eventId,
      name,
      description,
      startTime,
      endTime,
      category,
      categoryColor: eventCategories.find((cat) => cat.name === category).color,
      date: selectedDay,
    };

    let updatedEvents;
    if (eventToEdit) {
      updatedEvents = events.map((event) =>
        event.id === eventToEdit.id ? { ...eventToEdit, ...newEvent } : event
      );
      setEventToEdit(null);
    } else {
      updatedEvents = [...events, newEvent];
    }

    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    clearForm();
    setShowEventModal(false);
  };

  const clearForm = () => {
    setName("");
    setDescription("");
    setStartTime("");
    setEndTime("");
    setCategory("Work");
  };

  return (
    showEventModal && (
      <div className="absolute top-0 left-0 z-10 w-full h-full bg-[#00000090] grid rounded-lg">
        <form
          onSubmit={handleSubmit}
          className="place-self-center max-w-[360px] w-full text-[#808080] bg-white flex flex-col gap-4 py-6 px-7 text-base animation-fadeIn rounded-md"
        >
          <Input
            className="w-full text-black"
            type="text"
            placeholder="Enter event name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            className="w-full text-black"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
          <Input
            className="w-full text-black"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
          <Input
            className="w-full text-black"
            type="text"
            placeholder="Event description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="w-full text-black border rounded-md py-2 px-3"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            {eventCategories.map((cat) => (
              <option
                key={cat.name}
                value={cat.name}
                style={{ color: cat.color }}
              >
                {cat.name}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-4 mt-2">
            <Button onClick={() => setShowEventModal(false)} variant="outline">
              Cancel
            </Button>

            <Button type="submit">
              {eventToEdit ? "Update Event" : "Add Event"}
            </Button>
          </div>
        </form>
      </div>
    )
  );
};

export default EventModal;
