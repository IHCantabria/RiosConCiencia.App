//aux method to fill empty array positions with empty arraies for Format homogenization
const fillArray = (array, indexes) => {
  for (let i = indexes; i >= 0; i--) {
    array[i] = array[i] ? array[i] : (array[i] = []);
  }
  return array;
};
//aux method to Deep clone multi dimension Arrays
const deepCloneMultiArray = (arr) => {
  return arr.map((item) =>
    Array.isArray(item) ? deepCloneMultiArray(item) : item,
  );
};

const roundValue = (number, decimals) => {
  return +(Math.round(number + "e+" + decimals) + "e-" + decimals);
};

const promiseTimeout = (ms, promise) => {
  // Create a promise that rejects in <ms> milliseconds
  const timeout = new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      clearTimeout(id);
      reject("Timed out in " + ms + "ms.");
    }, ms);
  });

  // Returns a race between our timeout and the passed in promise
  return Promise.race([promise, timeout]);
};

const checkNestedProperty = (obj, propertyPath) => {
  if (!propertyPath) return false;

  const properties = propertyPath.split(".");

  for (let i = 0; i < properties.length; i++) {
    const prop = properties[i];

    if (!obj || !Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    } else {
      obj = obj[prop];
    }
  }

  return true;
};

const canDoExpert = (roleId) => {
  const RoleIdsExpert = [1, 2, 3, 7, 8];
  return RoleIdsExpert.includes(parseInt(roleId));
};

const canDoPicts = (roleId) => {
  const RoleIdsPicts = [1, 2, 4, 7, 9];
  return RoleIdsPicts.includes(parseInt(roleId));
};

export {
  fillArray,
  deepCloneMultiArray,
  roundValue,
  promiseTimeout,
  checkNestedProperty,
  canDoExpert,
  canDoPicts,
};
