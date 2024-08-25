const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const retry = async (fn, retries = 5, delay = 1000, backoff = 2) => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) {
      throw error;
    }
    await wait(delay);
    return retry(fn, retries - 1, delay * backoff, backoff);
  }
};

module.exports = retry;