/**
 * Formats a date to a readable string with time.
 * @param date - The date to format.
 * @param locale - The locale to use for formatting.
 * @returns The formatted date string.
 */
export const formatDate = (date: Date, locale: string = 'en-US'): string => {
  let parsedDate: Date;

  if (date instanceof Date) {
    parsedDate = date;
  } else if (typeof date === 'string' || typeof date === 'number') {
    parsedDate = new Date(date);
  } else {
    throw new Error('Invalid date parameter');
  }

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(parsedDate);
};
