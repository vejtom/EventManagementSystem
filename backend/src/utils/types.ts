import type { Result } from '@badrap/result';

/**
 * A generic type that used to type the return value
 * from every repository call.
 */
export type DbResult<T> = Promise<Result<T>>;