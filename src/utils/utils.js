//aux method to fill empty array positions with empty arraies for Format homogenization
const fillArray = (array, indexes) => {
  for (var i = indexes; i >= 0; i--) {
    array[i] = array[i] ? array[i] : (array[i] = []);
  }
  return array;
};
//aux method to Deep clone multi dimension Arrays
const deepCloneMultiArray = arr => {
  return arr.map(item =>
    Array.isArray(item) ? deepCloneMultiArray(item) : item
  );
};

const roundValue = (number, decimals) => {
  return +(Math.round(number + "e+" + decimals) + "e-" + decimals);
};

const promiseTimeout = function(ms, promise) {
  // Create a promise that rejects in <ms> milliseconds
  let timeout = new Promise((resolve, reject) => {
    let id = setTimeout(() => {
      clearTimeout(id);
      reject("Timed out in " + ms + "ms.");
    }, ms);
  });

  // Returns a race between our timeout and the passed in promise
  return Promise.race([promise, timeout]);
};

export { fillArray, deepCloneMultiArray, roundValue, promiseTimeout };
