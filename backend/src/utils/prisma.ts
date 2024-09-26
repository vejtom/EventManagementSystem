/**
 * PrismaError represents errors thrown by Prisma
 * It extends the standard Error interface and includes an optional Prisma error code
 */
interface PrismaError extends Error {
    code?: string; // The Prisma error code
}

/**
 * A type guard that checks if the given error is a Prisma-specific error
 * It verifies whether the error is an object with a `code` property
 *
 * @param error - The error to check
 * @returns True if the error is a PrismaError, otherwise false
 */
const isPrismaError = (error: unknown): error is PrismaError => {
    return (
        typeof error === 'object' &&
        error !== null &&
        'code' in error
    );
};

export default isPrismaError;
