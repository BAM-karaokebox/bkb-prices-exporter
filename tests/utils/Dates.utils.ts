export const getFutureDate = (givenDate: Date, increment: number): Date => {
  const futureDate = new Date(givenDate);
  futureDate.setDate(futureDate.getDate() + increment);
  return futureDate;
};

export const dateToLocalISOShortDate = (date: Date): string => {
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().substring(0, 10);
};
