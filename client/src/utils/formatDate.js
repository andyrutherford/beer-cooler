export const formatDate = (fullDate) => {
  const date = fullDate.split('-');
  return `${date[2].slice(0, 2)}-${date[1]}-${date[0]}`;
};
