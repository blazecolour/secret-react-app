export default offset => {
  const api = {
    key: '87263d6fc37146398aa3433de9cb01f1',
    baseUrl: `https://api.nytimes.com/svc/movies/v2/reviews/search.json/?api-key=`
  };
  return `${api.baseUrl}${api.key}&offset=${offset}`;
};
