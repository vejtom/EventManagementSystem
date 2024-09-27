import events from './data';
import prisma from '../src/client';

/**
 * Seeds the database with the application data.
 * Uses Prisma's transaction to ensure everything is inserted or nothing is.
 */
async function seed() {
  await prisma.$transaction([
    ...events.map((event) => prisma.event.create({
      data: event,
    })),
  ]);
}

// Execute the seed function & catch any errors
seed().catch(e => {
  console.error(e);
  process.exit(1);
});