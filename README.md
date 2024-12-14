# Event Calendar App

A simple and interactive Dynamic Event Calendar Application built with React + vite. Users can add, view, and manage events on specific days of the calendar. Events can be categorized and color-coded (e.g., work, personal, others). The app also includes features such as exporting event data and filtering functionality.

## Features

- **Calendar View**: Displays a calendar for the current month with the ability to navigate between months.
- **Event Management**: Users can create, edit, and delete events for any date.
- **Color Coding**: Events are color-coded based on their categories (work, personal, others).
- **Event Export**: Users can export event data for a specific month as JSON or CSV.
- **Event Indicators**: A small dot is shown on the calendar dates that have events.
- **Local Storage**: Events are stored in local storage to persist data between sessions.
- **Responsive Design**: The app is mobile-friendly and adapts to different screen sizes.

## Installation

Follow the steps below to run the application locally.

### Prerequisites

Ensure that you have the following installed on your local machine:

- **Node.js**: You can download it from [nodejs.org](https://nodejs.org).

### Steps to Run Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/krantikumar09/dynamic-event-calender.git
   cd event-calendar-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the app:**

   ```bash
   npm run dev
   ```

   This will run the app on `http://localhost:3000`. Open this URL in your browser to view the application.

## Usage

1. **Creating an Event:** Click on any date on the calendar to open the event modal. Fill out the event details and save it.
2. **Viewing Events:** Hover over any date with an event to see its details.
3. **Rescheduling an Event:** Click and drag an event to a different date to reschedule.
4. **Exporting Events:** Click the "Export" button to export events as JSON or CSV.
5. **Navigating Months:** Use the "Prev" and "Next" buttons to navigate between months.

## Deployed App

You can access the deployed app live here:

[Event Calendar App - Live]-(https://manage-event9.netlify.app/)

## Contributing

If you would like to contribute to the project, feel free to fork the repository and create a pull request with your changes. Please follow the code style and ensure your code is well-documented.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
