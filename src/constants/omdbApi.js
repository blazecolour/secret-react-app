export default name => {
  const api = {
    key: '4a8a7dca',
    baseUrl: `http://www.omdbapi.com/?t=${name}&plot=full&apikey=`
  };
  return `${api.baseUrl}${api.key}`;
};
