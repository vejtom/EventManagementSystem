import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEventEdit, useEvent } from '../../hooks/useEvents';
import { Button } from '../../components/general/Button';
import Input from '../../components/general/Input';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const formatDateForInput = (date: Date) => {
  if (!date || isNaN(new Date(date).getTime())) {
    return '';
  }

  return new Date(date).toISOString().split('.')[0];
};


const editEventSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters').max(255, 'Name must be less than 255 characters'),
    description: z
      .string()
      .optional()
      .refine((value) => value === '' || value === undefined || value.length >= 3, {
        message: 'Description must be at least 3 characters',
      }),
    from: z
      .string()
      .refine((val) => {
        const date = new Date(val);
        return !isNaN(date.getTime());
      }, {
        message: 'Invalid date',
      }),
    to: z
      .string()
      .refine((val) => {
        const date = new Date(val);
        return !isNaN(date.getTime());
      }, {
        message: 'Invalid date',
      }),
  })
  .superRefine((data, ctx) => {
    const fromDate = new Date(data.from);
    const toDate = new Date(data.to);

    if (toDate < fromDate) {
      ctx.addIssue({
        code: 'custom',
        path: ['to'],
        message: '\'To\' date must be after \'From\' date',
      });
    }
  });

type EditEventFormData = z.infer<typeof editEventSchema>;

export const EditEvent = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error('No event ID provided');
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EditEventFormData>({
    resolver: zodResolver(editEventSchema),
    mode: 'onChange',
  });

  const navigate = useNavigate();
  const eventEdit = useEventEdit(id);
  const { data: event } = useEvent(id);

  useEffect(() => {
    if (event) {
      setValue('name', event.item.name);
      setValue('description', event.item.description || '');
      setValue('from', formatDateForInput(event.item.from));
      setValue('to', formatDateForInput(event.item.to));
    }
  }, [event, setValue]); // Use effect to only run when event is fetched
  const onSubmit = (data: EditEventFormData) => {
    const cleanedData = {
      name: data.name,
      description: data.description || undefined,
      from: new Date(data.from),
      to: new Date(data.to),
    };

    eventEdit.mutate(cleanedData, {
      onSuccess: () => {
        navigate('/');
      },
    });
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto mt-8 md:mx-20">
      <h1 className="text-2xl font-bold mb-4">Edit Event</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="md:w-1/2">
          <Input
            id="name"
            label="Event Name"
            type="text"
            register={register('name')}
            placeholder="Enter event name"
          />
          {errors.name && <p className="text-red-500 text-sm flex items-end">{errors.name.message}</p>}
        </div>

        <div className="md:w-full">
          <Input
            inputType="textarea"
            id="description"
            label="Description"
            register={register('description')}
            placeholder="Enter description"
          />
          {errors.description && <p className="text-red-500 text-sm flex items-end">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
          <div>
            <Input
              id="from"
              label="From Date & Time"
              type="datetime-local"
              register={register('from')}
            />
            {errors.from && <p className="text-red-500 text-sm flex items-end">{errors.from.message}</p>}
          </div>
          <div>
            <Input
              id="to"
              label="To Date & Time"
              type="datetime-local"
              register={register('to')}
            />
            {errors.to && <p className="text-red-500 text-sm flex items-end">{errors.to.message}</p>}
          </div>
        </div>

        <div className="flex justify-start gap-4">
          <Button
            type="primary"
            label="Update Event"
            size="large"
            buttonType="submit"
          />
          <Button type="secondary" label="Cancel" size="large" onClick={handleCancel} />
        </div>
      </form>
    </div>
  );
};

export default EditEvent;
