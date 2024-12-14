import { Input } from "@/components/ui/input";
import { useContext } from "react";
import { EventContext } from "../Context/EventContext";

// eslint-disable-next-line react/prop-types
const SearchEvent = () => {
  const { filterEvents, searchQuery } = useContext(EventContext);

  const handleSearchChange = (e) => {
    filterEvents(e.target.value); // Trigger filtering based on search input
  };

  return (
    <div>
      {/* search component */}
      <Input
        type="text"
        placeholder="Search events"
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchEvent;
