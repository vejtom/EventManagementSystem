// NotFoundError class for handling missing entities
export default class NotFoundError extends Error {
    constructor(entity: string) {
        super(`${entity} not found`);
            this.name = "NotFoundError";
    }
}