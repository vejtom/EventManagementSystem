import { Router } from 'express';
import eventController from './controller';

// Event related routes
export const eventRouter = Router();

eventRouter.get('/', eventController.getAll);
eventRouter.get('/:id', eventController.getById);
eventRouter.post('/', eventController.create);
eventRouter.put('/:id', eventController.update);
eventRouter.delete('/:id', eventController.delete);