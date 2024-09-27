import { faker } from '@faker-js/faker';
import { Event } from '../src/events/types';

faker.seed(123); // Seed the faker instance to get consistent results

/**
 * Takes an array of two dates and splits them into 'from' and 'to' dates.
 *
 * @param dates - An array containing two Date objects.
 * @returns An object with 'from' and 'to' dates.
 */
const splitDates = (dates: Date[]): { from: Date, to: Date } => {
  const [from, to] = dates;
  return { from, to };
};

/**
 * Generates a fake event with a name, description, and date range (from, to).
 *
 * @returns A generated Event object.
 */
const generateEvent = (): Event => {
  const dates = faker.date.betweens({
    from: '2020-01-01T00:00:00.000Z',
    to: '2030-01-01T00:00:00.000Z',
    count: 2, // Get 2 dates, one for 'from' and one for 'to'
  });

  // Split the generated dates into 'from' and 'to'
  const { from, to } = splitDates(dates);

  return {
    name: faker.company.catchPhrase(),
    description: faker.lorem.paragraph({ min: 15, max: 1024 }),
    from,
    to,
  };
};

// Generate 13 fake events
const events: Event[] = Array(13).fill(null).map(generateEvent);
export default events;