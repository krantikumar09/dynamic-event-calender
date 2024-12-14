import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ExportEvents = () => {
  // Helper function to retrieve events from local storage
  const getEventsFromLocalStorage = () => {
    const events = localStorage.getItem("events"); // Assume events are stored with the key 'events'
    return events ? JSON.parse(events) : []; // If no events are found, return an empty array
  };

  // Function to export events as JSON
  const exportAsJSON = () => {
    const events = getEventsFromLocalStorage();
    if (events.length === 0) {
      alert("No events found to export.");
      return;
    }
    const blob = new Blob([JSON.stringify(events, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, "events.json");
  };

  // Function to export events as CSV
  const exportAsCSV = () => {
    const events = getEventsFromLocalStorage();
    if (events.length === 0) {
      alert("No events found to export.");
      return;
    }

    // Generate CSV from JSON
    const csvHeaders = [
      "date",
      "name",
      "startTime",
      "endTime",
      "description",
      "category",
    ];
    const csvRows = events.map((event) =>
      csvHeaders.map((header) => `"${event[header]}"`).join(",")
    );
    const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "events.csv");
  };

  return (
    <div className="export-events-container">
      <div className="space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Export Events</Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56">
            <DropdownMenuCheckboxItem onClick={exportAsJSON}>Export as JSON</DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem onClick={exportAsCSV}>Export as CSV</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ExportEvents;
