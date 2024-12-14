export const loadEventsFromStorage = (month) => {
    const key = `${month.getFullYear()} - ${month.getMonth()}`;
    const events = JSON.parse(localStorage.getItem(key)) || [];
    return events;
}

export const saveEventToStorage = (event, month) => {
    const key = `${month.getFullYear()} - ${month.getMonth()}`;
    const events = loadEventsFromStorage(month);
    events.push(event);
    localStorage.setItem(key, JSON.stringify(events));
}

export const deleteEventFromStorage = (eventId, month) => {
    const key = `${month.getFullYear()}-${month.getMonth()}`;
    const events = loadEventsFromStorage(month);
    const updatedEvents = events.filter(event => event.id !== eventId);
    localStorage.setItem(key, JSON.stringify(updatedEvents));
  };