import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEvent } from '../../hooks/useEvents';
import { Button } from '../../components/general/Button';
import Input from '../../components/general/Input';

const ViewEvent = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    throw new Error('No event ID provided');
  }
  const navigate = useNavigate();
  const { data: event, isLoading } = useEvent(id);

  useEffect(() => {
    if (!event && !isLoading) {
      navigate('/');
    }
  }, [event, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="container mx-auto mt-8 md:mx-20">
      <h1 className="text-2xl font-bold mb-4">View Event</h1>

      {/* Event Name */}
      <div className="md:w-1/2 md:mb-4">
        <Input
          id="name"
          label="Event Name"
          type="text"
          value={event.item.name}
          readOnly={true}
        />
      </div>

      {/* Description */}
      <div className="md:w-full md:mb-4">
        <Input
          inputType="textarea"
          id="description"
          label="Description"
          value={event.item.description || 'No description available'}
          readOnly={true}
        />
      </div>

      {/* From and To Date & Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <Input
            id="from"
            label="From Date & Time"
            type="datetime-local"
            value={new Date(event.item.from).toISOString().slice(0, 16)}
            readOnly={true}
          />
        </div>
        <div>
          <Input
            id="to"
            label="To Date & Time"
            type="datetime-local"
            value={new Date(event.item.to).toISOString().slice(0, 16)}
            readOnly={true}
          />
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-6">
        <Button type="secondary" label="Back to Events" onClick={() => navigate('/')} />
      </div>
    </div>
  );
};

export default ViewEvent;
