export const formatWebName = (name: string): string => {
  const items = name.split(".");
  return items[0] !== "www"
    ? items[0][0].toLocaleUpperCase() + items[0].substring(1)
    : items[1][0].toLocaleUpperCase() + items[1].substring(1);
};
