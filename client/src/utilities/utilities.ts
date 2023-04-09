export const roundTemperatures = (num: number) => {
  return Math.round(num);
};

export const formatDate = (dateStr: string) => {
  const date = new Date(Date.parse(dateStr));
  return date.toDateString();
};

export const formatTime = (dateStr: string) => {
  const date = new Date(Date.parse(dateStr));
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
