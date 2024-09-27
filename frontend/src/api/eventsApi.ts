import { Event, EventBasic, EventEdit } from '../models/event';
import { ReqPagination } from '../models/request';
import BaseApi from './baseApi';

const EVENTS_PREFIX = '/events';
const TYPE_BASIC = {type: 'basic'};

async function getSingle(id: string) {
  return BaseApi.getSingle<Event>(`${EVENTS_PREFIX}/${id}`);
}

async function getAll() {
  return BaseApi.getAll<Event>(EVENTS_PREFIX);
}

async function getAllBasic() {
  return BaseApi.getAll<EventBasic>(EVENTS_PREFIX, {
    params: TYPE_BASIC,
  });
}

async function getAllPaginated({ page }: ReqPagination) {
  return BaseApi.getAllPaginated<Event>(EVENTS_PREFIX, {
    params: { page },
  });
}

async function createSingle(payload: EventEdit) {
  return BaseApi.postSingle<Event>(EVENTS_PREFIX, payload);
}

async function updateSingle(id: string, payload: EventEdit) {
  return BaseApi.putSingle<Event>(`${EVENTS_PREFIX}/${id}`, payload);
}

async function deleteSingle(id: string) {
  return BaseApi.deleteSingle<Event>(`${EVENTS_PREFIX}/${id}`);
}

const EventsApi = {
  getSingle,
  getAll,
  getAllBasic,
  getAllPaginated,
  createSingle,
  updateSingle,
  deleteSingle,
};

export default EventsApi;