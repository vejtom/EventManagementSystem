// Event data structure used in the application
export interface Event {
    name: string;
    description?: string | null;
    from: Date;
    to: Date;
}

// Event data structure that includes metadata from the database
export interface EventFromDb extends Event {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}