import { useEventDelete } from '../../hooks/useEvents';
import { Button } from '../../components/general/Button';
import { useNavigate, useParams } from 'react-router-dom';

export const DeleteEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const deleteEvent = useEventDelete(id || '');

  const handleDelete = () => {
    deleteEvent.mutate(undefined, {
      onSuccess: () => {
        navigate('/');
      },
    });
  };

  return (
    <div className="container mx-auto mt-8 md:mx-20">
      <h1 className="text-2xl font-bold mb-4">Delete Event</h1>
      <p>Are you sure you want to delete this event?</p>
      <div className="flex justify-center gap-5 my-5">
        <Button type="primary" label="Delete" onClick={handleDelete} size="large" />
        <Button type="secondary" label="Cancel" to='/' size="large" />
      </div>
    </div>
  );
};

export default DeleteEvent;
