import { useContext, useState } from "react";
import { EventContext } from "../Context/EventContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const EventList = () => {
  const {
    selectedDay,
    setShowEventModal,
    setEventToEdit,
    deleteEventFromStorage,
    getEventsForSelectedDay,
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
        className="mb-2 md:mb-4 focus:outline-none focus:border-none text-sm text-black"
        type="text"
        placeholder="Search events"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />

      <div className="p-4">
        <h3 className="text-md md:text-xl text-black font-bold mb-3">{selectedDay}</h3>
        <hr className="mb-4" />
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="mb-4 flex items-center justify-between"
            >
              <div>
                <h4 className="text-black text-md md:text-xl font-semibold mb-1">
                  {event.name}
                </h4>
                <p className="text-slate-500 text-xs md:text-sm mb-1">
                  {event.startTime} - {event.endTime}
                </p>
                <p className="text-slate-500 text-xs md:test-sm">{event.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  className="p-0"
                  onClick={() => {
                    setEventToEdit(event);
                    setShowEventModal(true);
                  }}
                  variant="outline"
                  size="icon"
                >
                  <FontAwesomeIcon icon={faPen} className="text-sm" />
                </Button>

                <Button
                  className="p-0"
                  onClick={() => deleteEventFromStorage(event.id)}
                  variant="outline"
                  size="icon"
                >
                  <FontAwesomeIcon icon={faTrash} className="text-sm" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm md:text-base text-black mb-4">
            No events for this day
          </p>
        )}
        <div className="w-full text-right">
          <Button
            onClick={() => setShowEventModal(true)}
          >
            <FontAwesomeIcon icon={faPlus}/>
            Create Event
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventList;
