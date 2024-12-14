import Calendar from "./components/Calendar";
import EventList from "./components/EventList";
import EventModal from "./components/EventModal";
import Header from "./components/Header";
import "./output.css";
const App = () => {
  return (
    <div className="w-full h-auto flex items-center justify-center p-0 sm:p-6 md:p-8 lg:p-10 transition">
      <div className="relative container mx-auto h-full bg-white md:rounded-xl">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4 p-4 md:p-6">
          <Calendar />
          <EventList />
        </div>
        <EventModal />
      </div>
    </div>
  );
};

export default App;
