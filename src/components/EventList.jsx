import  { useContext,  useState } from "react";
import { EventContext } from "../Context/EventContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EventList = () => {
  const {
    selectedDay,
    setShowEventModal,
    setEventToEdit,
    deleteEventFromStorage,
    getEventsForSelectedDay
  } = useContext(EventContext);
  const [searchKeyword, setSearchKeyword] = useState("");
 

  const eventsForSelectedDay = getEventsForSelectedDay();

  // Filter events by keyword
  const filteredEvents = eventsForSelectedDay.filter(
    (event) =>
      event.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      event.description.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="event-list">
      <Input
        type="text"
        placeholder="Search events"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />

      <h3>{selectedDay}</h3>

      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <div key={event.id} className="event-item">
            <h4>{event.name}</h4>
            <p>
              {event.startTime} - {event.endTime}
            </p>
            <p>{event.description}</p>

            <Button
              onClick={() => {
                setEventToEdit(event);
                setShowEventModal(true);
              }}
              varrient="outline"
              size="Icon"
            >
              Edit
            </Button>

            <Button
              onClick={() => deleteEventFromStorage(event.id)}
              varrient="outline"
              size="Icon"
            >
              delete
            </Button>
          </div>
        ))
      ) : (
        <p>No events for this day</p>
      )}

      <Button onClick={() => setShowEventModal(true)}>Create Event</Button>
    </div>
  );
};

export default EventList;
