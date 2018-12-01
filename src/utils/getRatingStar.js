const normalizeRating = rating => Math.ceil(Number(rating) / 2);

export default rating => {
  const result = normalizeRating(rating);
  return isNaN(result) ? 'no rating' : Array(result).fill('*');
};
