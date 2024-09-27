import { Button } from '../../components/general/Button';
import { PlusIcon } from '@heroicons/react/16/solid';
import { Input } from '../../components/general/Input';

export const Events = () => {
  return (
    <div className="container mx-auto mt-8  md:mx-20">
      <header className="flex justify-between items-center mb-6 mx-4 md:mx-0">
        <h1 className="text-2xl font-bold">Events List</h1>

        {/* Add new event button */}
        <Button
          type="secondary"
          label="Add New Event"
          to="/add"
          icon={PlusIcon}
        />
      </header>

      {/* Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mx-8 lg:mx-0">
        {/* Filter by Name */}
        <Input
          id="filter-name"
          label="Filter by Name:"
          placeholder="Enter event name..."
          type="text"
        />

        {/* Filter by Date */}
        <div className="flex flex-col">
          <label htmlFor="filter-start-date" className="font-medium">Filter by Date:</label>
          <div className="flex flex-col md:flex-row md:space-x-2 md:justify-evenly md:items-center">
            <Input id="filter-start-date" label="" type="date" />
            <span>to</span>
            <Input id="filter-end-date" label="" type="date" />
          </div>
        </div>
      </div>

      <hr className="my-3 border-gray-300" />


      {/* Event list table */}
      <section>
      </section>
    </div>
  );
};
