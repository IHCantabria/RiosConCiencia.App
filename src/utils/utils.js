//aux method to fill empty array positions with empty arraies for Format homogenization
const fillArray = (array, indexes) => {
  for (var i = indexes; i >= 0; i--) {
    array[i] = array[i] ? array[i] : (array[i] = []);
  }
  return array;
};
//aux method to get the background img
const getBackground = (idSection, idOption) => {
  let urlBackground;
  switch (true) {
    case idSection == 0 && idOption == 1:
      urlBackground = "river.jpg";
      break;
    case idSection == 0 && idOption == 2:
      urlBackground = "riverFlow.gif";
      break;
    case idSection == 1 && idOption == 1:
      urlBackground = "yellowWidth.jpg";
      break;
    case idSection == 1 && idOption == 2:
      urlBackground = "blueWidth.jpg";
      break;
    case idSection == 1 && idOption == 3:
      urlBackground = "greenWidth.jpg";
      break;
    case idSection == 1 && idOption == 4:
      urlBackground = "redWidth.jpg";
      break;
    case idSection == 1 && idOption == 5:
      urlBackground = "turquoiseWidth.jpg";
      break;
  }
  return urlBackground;
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

const checkNestedProperty = function(obj, propertyPath) {
  if (!propertyPath) return false;

  var properties = propertyPath.split(".");

  for (var i = 0; i < properties.length; i++) {
    var prop = properties[i];

    if (!obj || !obj.hasOwnProperty(prop)) {
      return false;
    } else {
      obj = obj[prop];
    }
  }

  return true;
};

export {
  fillArray,
  deepCloneMultiArray,
  roundValue,
  promiseTimeout,
  checkNestedProperty,
  getBackground
};
