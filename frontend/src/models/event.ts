import { BaseModelId, BaseModelTimestamps } from './base';

export type EventBasic = BaseModelId & {
    name: string;
    from: Date;
}

export type Event = EventBasic & BaseModelTimestamps & {
    description?: string;
    to: Date;
}

export type EventEdit = Omit<Event, 'id' | 'createdAt' | 'updatedAt'>;