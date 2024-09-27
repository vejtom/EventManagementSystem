import prisma from '../client';
import { Event, EventFromDb } from './types';
import { DbResult } from '../utils/types';
import { Result } from '@badrap/result';
import ok = Result.ok;
import err = Result.err;
import InternalError from '../utils/errors/internal';
import NotFoundError from '../utils/errors/not-found';
import isPrismaError from '../utils/prisma';

const ENTITY_NAME = 'Event';

/**
 * Fetches all events from the database.
 *
 * @returns A Result object containing the list of events if successful,
 * or an InternalError error if failed.
 */

const getEvents = async (): DbResult<EventFromDb[]> => {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        createdAt: 'desc', // Sort by createdAt, most recent first
      },
    });

    return ok(events);
  } catch (error) {
    console.error('Error while fetching all events: ', error);
    return err(new InternalError('Failed to retrieve events'));
  }
};

/**
 * Fetches an event by its ID from the database.
 *
 * @param id - The ID of the event to fetch.
 * @returns A Result object containing the event if successful,
 * or a NotFoundError error if failed.
 */
const getEventById = async (id: number): DbResult<EventFromDb> => {
  try {
    const event: EventFromDb | null = await prisma.event.findUnique({
      where: {
        id,
      },
    });

    if (!event) {
      return err(new NotFoundError(ENTITY_NAME));
    }
    return ok(event);
  } catch (error) {
    console.error('Error while fetching event by ID: ', error);
    return err(new InternalError('Failed to retrieve event'));
  }
};

/**
 * Creates a new event in the database.
 *
 * @param eventData - The parameters for creating the new event.
 * @returns A Result object containing the created event if successful,
 * or an InternalError error if failed.
 */
const createEvent = async (eventData: Event): DbResult<EventFromDb> => {
  try {
    const newEvent = await prisma.event.create({
      data: {
        ...eventData,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return ok(newEvent);
  } catch (error) {
    console.error('Error while creating event: ', error);
    return err(new InternalError('Failed to create event'));
  }
};

/**
 * Updates an event in the database.
 *
 * @param id - The ID of the event to update.
 * @param updatedData - The new data for the event.
 * @returns A Result object containing the updated event if successful,
 * or a NotFoundError error if event was not found,
 * or an InternalError error if failed.
 */
const updateEvent = async (id: number, updatedData: Partial<Event>): DbResult<EventFromDb> => {
  try {


    // Update the event with the new data
    const updatedEvent = await prisma.event.update({
      where: {
        id,
      },
      data: {
        ...updatedData,
        updatedAt: new Date(),
      },
    });
    return ok(updatedEvent);
  } catch (error) {
    if (isPrismaError(error) && error.code === 'P2025') {
      return err(new NotFoundError(ENTITY_NAME));
    }
    console.error('Unexpected error while updating event: ', error);
    return err(new InternalError('Failed to update event'));
  }
};

/**
 * Deletes an event from the database.
 * @param id - The ID of the event to delete.
 * @returns A Result object containing the deleted event if successful,
 * or a NotFoundError error if event was not found,
 * or an InternalError error if failed.
 */
const deleteEvent = async (id: number): DbResult<EventFromDb> => {
  try {
    const deletedEvent = await prisma.event.delete({
      where: { id },
    });
    return ok(deletedEvent);
  } catch (error) {
    if (isPrismaError(error) && error.code === 'P2025') {
      return err(new NotFoundError(ENTITY_NAME));
    }
    console.error('Unexpected error while deleting event: ', error);
    return err(new InternalError('Failed to delete event'));
  }
};

const eventRepository = {
  getAll: getEvents,
  getById: getEventById,
  create: createEvent,
  update: updateEvent,
  delete: deleteEvent,
};

export default eventRepository;