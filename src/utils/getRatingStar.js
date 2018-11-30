export const normalizeRating = rating => Math.ceil(Number(rating) / 2);

export const getRatingStar = rating =>
  isNaN(rating) ? 'no rating' : Array(rating).fill('*');
