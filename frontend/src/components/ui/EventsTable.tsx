import { FC } from 'react';
import { Event } from '../../models/event';
import { Button } from '../general/Button';

type EventsTableProps = {
  data?: Event[];
};

const EventsTable: FC<EventsTableProps> = ({ data = [] }) => {
  return (
    <div className="overflow-x-auto scroll-smooth scrollbar-thumb-rounded scrollbar-thumb-gray-500">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-center">Event Name</th>
            <th className="py-2 px-4 text-center">Description</th>
            <th className="py-2 px-4 text-center">From Date</th>
            <th className="py-2 px-4 text-center">To Date</th>
            <th className="py-2 px-4"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((event) => (
            <tr key={event.id} className="border-t">
              <td className="py-2 px-4 truncate max-w-xs text-left">{event.name}</td>
              <td className="py-2 px-4 truncate max-w-xs text-left">
                {event.description || 'No description'}
              </td>
              <td className="py-2 px-4">
                {new Date(event.from).toLocaleString()}
              </td>
              <td className="py-2 px-4">
                {new Date(event.to).toLocaleString()}
              </td>
              <td className="py-2 px-4">
                <div className="flex space-x-2">
                  <Button
                    type="secondary"
                    label="View"
                    to={`/events/${event.id}/view`} // Navigate to view page
                  />
                  <Button
                    type="secondary"
                    label="Edit"
                    to={`/events/${event.id}/edit`} // Navigate to edit page
                  />
                  <Button
                    type="secondary"
                    label="Delete"
                    to={`/events/${event.id}/delete`} // Navigate to delete page
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventsTable;
