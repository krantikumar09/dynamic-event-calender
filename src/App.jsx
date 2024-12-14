
import Calendar from "./components/Calendar";
import EventList from "./components/EventList";
import EventModal from "./components/EventModal";
import "./output.css";
const App = () => {

  return (
      <div className="flex items-start gap-6">
          <Calendar/>
          <EventList />
          <EventModal/>
      </div>
  );
};

export default App;
