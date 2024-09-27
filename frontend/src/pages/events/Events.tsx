import { Button } from '../../components/general/Button';
import { PlusIcon } from '@heroicons/react/16/solid';
import { Input } from '../../components/general/Input';
import { useEvents } from '../../hooks/useEvents';
import EventsTable from '../../components/ui/EventsTable';
import EventsTableLoader from '../../components/ui/EventsTableLoader';
import { useState, useEffect } from 'react';

export const Events = () => {
  const [page] = useState(1);
  const { data: eventsResp, isFetching } = useEvents(page);

  // State for filters
  const [nameFilter, setNameFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Filtered events
  const [filteredEvents, setFilteredEvents] = useState([]);

  // Apply filtering logic whenever filters or events change
  useEffect(() => {
    if (eventsResp?.items) {
      let filtered = eventsResp.items;

      // Filter by name
      if (nameFilter) {
        filtered = filtered.filter(event =>
          event.name.toLowerCase().includes(nameFilter.toLowerCase())
        );
      }

      // Filter by date range
      if (startDate) {
        filtered = filtered.filter(event => new Date(event.from) >= new Date(startDate));
      }
      if (endDate) {
        filtered = filtered.filter(event => new Date(event.to) <= new Date(endDate));
      }

      setFilteredEvents(filtered);
    }
  }, [nameFilter, startDate, endDate, eventsResp]);

  return (
    <div className="container mx-auto mt-8 md:mx-20">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Events List</h1>

        {/* Add new event button */}
        <Button
          type="secondary"
          label="Add New Event"
          to="/create-event"
          icon={PlusIcon}
        />
      </header>

      {/* Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Filter by Name */}
        <Input
          id="filter-name"
          label="Filter by Name:"
          placeholder="Enter event name..."
          type="text"
          value={nameFilter} // Controlled input
          onChange={(e) => setNameFilter(e.target.value)} // Update filter state
        />

        {/* Filter by Date */}
        <div className="flex flex-col">
          <label htmlFor="filter-start-date" className="font-medium">Filter by Date:</label>
          <div className="flex flex-col md:flex-row md:space-x-2 md:justify-evenly md:items-center">
            <Input
              id="filter-start-date"
              label=""
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span>to</span>
            <Input
              id="filter-end-date"
              label=""
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <hr className="my-3 border-gray-300" />

      {/* Event list table */}
      <section>
        {filteredEvents.length > 0 && !isFetching ? (
          <EventsTable data={filteredEvents} />
        ) : isFetching ? (
          <EventsTableLoader />
        ) : (
          <p>No events found.</p>
        )}
      </section>
    </div>
  );
};
