export default {
  request(url, method = 'get', payload = {}, config = {}) {
    return new Promise((resolve, reject) => {
      resolve(payload);
    });
  },
};
