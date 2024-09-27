import { Event, EventEdit } from '../models/event';
import { ApiRespMultiPaginated, ApiRespSingle } from '../models/response';
import {
  useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult
} from '@tanstack/react-query';
import eventsApi from '../api/eventsApi';

const queryKeys = {
  events: 'events',
};

export const useEvents = (page: number):
    UseQueryResult<ApiRespMultiPaginated<Event>, Error> => {
  return useQuery<ApiRespMultiPaginated<Event>, Error, ApiRespMultiPaginated<Event>>({
    queryKey: [queryKeys.events, page],
    queryFn: async () => {
      const response: ApiRespMultiPaginated<Event> = await eventsApi.getAllPaginated({ page });
      console.log('API response:', response);
      return response;
    },
  });
};


export const useEvent = (id: string):
    UseQueryResult<ApiRespSingle<Event>, Error> => {
  return useQuery<ApiRespSingle<Event>, Error, ApiRespSingle<Event>>({
    queryKey: [queryKeys.events, id],
    queryFn: async () => {
      const response: ApiRespSingle<Event> = await eventsApi
        .getSingle(id);
      return response;
    },
  });
};

export const useEventCreate = ():
    UseMutationResult<ApiRespSingle<Event>, Error, EventEdit> => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ApiRespSingle<Event>, Error, EventEdit>({
    mutationFn: (newEvent: EventEdit) => eventsApi
      .createSingle(newEvent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.events] });
    }
  });
  return mutation;
};

export const useEventEdit = (id: string):
    UseMutationResult<ApiRespSingle<Event>, Error, EventEdit> => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ApiRespSingle<Event>, Error, EventEdit>({
    mutationFn: (updatedEvent: EventEdit) => eventsApi
      .updateSingle(id, updatedEvent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.events] });
    }
  });
  return mutation;
};

export const useEventDelete = (id: string):
    UseMutationResult<ApiRespSingle<Event>, Error, void> => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ApiRespSingle<Event>, Error>({
    mutationFn: () => eventsApi.deleteSingle(id),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: [queryKeys.events, id] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.events] });
    }
  });
  return mutation;
};
