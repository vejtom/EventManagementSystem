import { Request, Response } from 'express';
import eventRepository from './repository';
import { handleRepositoryErros, parseRequest } from '../utils/api';
import { createEventRequestSchema, deleteEventRequestSchema, getEventRequestSchema, getEventRequestsSchema, updateEventRequestSchema } from '../validationSchemas/event-validation';

// Controller to get all events
const getEvents = async (req: Request, res: Response) => {
  const request = await parseRequest(getEventRequestsSchema, req, res);
  if (!request) return;

  const result = await eventRepository.getAll();
  if (result.isErr) {
    handleRepositoryErros(result.error, res);
    return;
  }

  res.status(200).json({items: result.value});
};

// Controller to get an event by its ID
const getEventById = async (req: Request, res: Response) => {
  const request = await parseRequest(getEventRequestSchema, req, res);
  if (!request) return;

  const { id } = request.params;

  const result = await eventRepository.getById(id);
  if (result.isErr) {
    handleRepositoryErros(result.error, res);
    return;
  }

  res.status(200).json({item: result.value});
};

// Controller to create an event
const createEvent = async (req: Request, res: Response) => {
  const request = await parseRequest(createEventRequestSchema, req, res);
  if (!request) return;

  const eventRequest = request.body;
  const newEvent = await eventRepository.create(eventRequest);
  if (newEvent.isErr) {
    handleRepositoryErros(newEvent.error, res);
    return;
  }

  res.status(201).json(newEvent.value);
};

// Controller to update an event
const updateEvent = async (req: Request, res: Response) => {
  const request = await parseRequest(updateEventRequestSchema, req, res);
  if (!request) return;

  const { id } = request.params;

  const eventRequest = request.body;
  const updatedEvent = await eventRepository.update(id, eventRequest);
  if (updatedEvent.isErr) {
    handleRepositoryErros(updatedEvent.error, res);
    return;
  }

  res.status(200).json(updatedEvent.value);
};

// Controller to delete an event
const deleteEvent = async (req: Request, res: Response) => {
  const request = await parseRequest(deleteEventRequestSchema, req, res);
  if (!request) return;

  const { id } = request.params;

  const deletedEvent = await eventRepository.delete(id);
  if (deletedEvent.isErr) {
    handleRepositoryErros(deletedEvent.error, res);
    return;
  }

  res.status(200).json(deletedEvent.value);
};

export const eventController = {
  getAll: getEvents,
  getById: getEventById,
  create: createEvent,
  update: updateEvent,
  delete: deleteEvent,
};

export default eventController;