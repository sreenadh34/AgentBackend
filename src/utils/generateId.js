export const generateUniqueId = () => {
  const prefix = 'EDU';
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}${randomNumber}`;
};
