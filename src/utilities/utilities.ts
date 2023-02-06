export const roundTemperatures = (num: number) => {
  return Math.round(num);
};

export const formatDate = (dateStr: string) => {
  const date = new Date(Date.parse(dateStr));

  return date.toDateString();
};
