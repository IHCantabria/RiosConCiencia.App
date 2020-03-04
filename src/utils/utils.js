//aux method to fill empty array positions with empty arraies for Format homogenization
const fillArray = (array, indexes) => {
  for (var i = indexes; i >= 0; i--) {
    array[i] = array[i] ? array[i] : (array[i] = []);
  }
  return array;
};
//aux method to get the img required
const getImg = (idSection, idOption, idAlt) => {
  let urlBackground;
  switch (true) {
    case idSection == 0 && idOption == 1 && idAlt == 1:
      urlBackground = "river.jpg";
      break;
    case idSection == 0 && idOption == 2 && idAlt == 1:
      urlBackground = "riverFlow.gif";
      break;
    case idSection == 1 && idOption == 1 && idAlt == 1:
      urlBackground = "yellowWidth.jpg";
      break;
    case idSection == 1 && idOption == 2 && idAlt == 1:
      urlBackground = "blueWidth.jpg";
      break;
    case idSection == 1 && idOption == 3 && idAlt == 1:
      urlBackground = "greenWidth.jpg";
      break;
    case idSection == 1 && idOption == 4 && idAlt == 1:
      urlBackground = "redWidth.jpg";
      break;
    case idSection == 1 && idOption == 5 && idAlt == 1:
      urlBackground = "turquoiseWidth.jpg";
      break;
    case idSection == 2 && idOption == 1 && idAlt == 1:
      urlBackground = "yellowDepth.jpg";
      break;
    case idSection == 2 && idOption == 2 && idAlt == 1:
      urlBackground = "blueDepth.jpg";
      break;
    case idSection == 2 && idOption == 3 && idAlt == 1:
      urlBackground = "greenDepth.jpg";
      break;
    case idSection == 2 && idOption == 4 && idAlt == 1:
      urlBackground = "redDepth.jpg";
      break;
    case idSection == 3 && idOption == 1 && idAlt == 1:
      urlBackground = "greenTemp.jpg";
      break;
    case idSection == 3 && idOption == 2 && idAlt == 1:
      urlBackground = "redTemp.jpg";
      break;
    case idSection == 3 && idOption == 3 && idAlt == 1:
      urlBackground = "blueTemp.jpg";
      break;
    case idSection == 3 && idOption == 4 && idAlt == 1:
      urlBackground = "yellowTemp.jpg";
      break;
    case idSection == 3 && idOption == 5 && idAlt == 1:
      urlBackground = "blackTemp.jpg";
      break;
    case idSection == 4 && idOption == 1 && idAlt == 1:
      urlBackground = "forestEnv.jpg";
      break;
    case idSection == 4 && idOption == 2 && idAlt == 1:
      urlBackground = "plantsEnv.jpg";
      break;
    case idSection == 4 && idOption == 3 && idAlt == 1:
      urlBackground = "roadsEnv.jpg";
      break;
    case idSection == 4 && idOption == 4 && idAlt == 1:
      urlBackground = "animalsEnv.jpg";
      break;
    case idSection == 4 && idOption == 5 && idAlt == 1:
      urlBackground = "houseEnv.jpg";
      break;
    case idSection == 4 && idOption == 6 && idAlt == 1:
      urlBackground = "factoryEnv.jpg";
      break;
    case idSection == 4 && idOption == 7 && idAlt == 1:
      urlBackground = "parkingEnv.jpg";
      break;
    case idSection == 4 && idOption == 8 && idAlt == 1:
      urlBackground = "orchardEnv.jpg";
      break;
    case idSection == 4 && idOption == 9 && idAlt == 1:
      urlBackground = "treatmentEnv.jpg";
      break;
    case idSection == 4 && idOption == 10 && idAlt == 1:
      urlBackground = "trainEnv.jpg";
      break;
    case idSection == 4 && idOption == 11 && idAlt == 1:
      urlBackground = "recreationEnv.jpg";
      break;
    case idSection == 4 && idOption == 12 && idAlt == 1:
      urlBackground = "campingEnv.jpg";
      break;
    case idSection == 5 && idOption == 1 && idAlt == 1:
      urlBackground = "riverColor.jpg";
      break;
    case idSection == 5 && idOption == 2 && idAlt == 1:
      urlBackground = "brownColor.jpg";
      break;
    case idSection == 5 && idOption == 3 && idAlt == 1:
      urlBackground = "greenColor.jpg";
      break;
    case idSection == 5 && idOption == 4 && idAlt == 1:
      urlBackground = "greyColor.jpg";
      break;
    case idSection == 6 && idOption == 1 && idAlt == 1:
      urlBackground = "riverSmell.jpg";
      break;
    case idSection == 6 && idOption == 2 && idAlt == 1:
      urlBackground = "garbageSmell.jpg";
      break;
    case idSection == 7 && idOption == 1 && idAlt == 1:
      urlBackground = "plasticBagGarbage.jpg";
      break;
    case idSection == 7 && idOption == 2 && idAlt == 1:
      urlBackground = "plasticBottleGarbage.jpg";
      break;
    case idSection == 7 && idOption == 3 && idAlt == 1:
      urlBackground = "paperGarbage.jpg";
      break;
    case idSection == 7 && idOption == 4 && idAlt == 1:
      urlBackground = "canGarbage.jpg";
      break;
    case idSection == 7 && idOption == 5 && idAlt == 1:
      urlBackground = "glassBottleGarbage.jpg";
      break;
    case idSection == 7 && idOption == 6 && idAlt == 1:
      urlBackground = "clothesGarbage.jpg";
      break;
    case idSection == 7 && idOption == 7 && idAlt == 1:
      urlBackground = "cigaretteGarbage.jpg";
      break;
    case idSection == 7 && idOption == 8 && idAlt == 1:
      urlBackground = "brickGarbage.jpg";
      break;
    case idSection == 8 && idOption == 1 && idAlt == 1:
      urlBackground = "nettlePlants.jpg";
      break;
    case idSection == 8 && idOption == 2 && idAlt == 1:
      urlBackground = "hazelPlants.jpg";
      break;
    case idSection == 8 && idOption == 3 && idAlt == 1:
      urlBackground = "ashTreePlants.jpg";
      break;
    case idSection == 8 && idOption == 4 && idAlt == 1:
      urlBackground = "oakPlants.jpg";
      break;
    case idSection == 8 && idOption == 5 && idAlt == 1:
      urlBackground = "pampasGrassPlants.jpg";
      break;
    case idSection == 8 && idOption == 6 && idAlt == 1:
      urlBackground = "saintJosephPlants.jpg";
      break;
    case idSection == 8 && idOption == 7 && idAlt == 1:
      urlBackground = "bambuPlants.jpg";
      break;
    case idSection == 9 && idOption == 0 && idAlt == 0:
      urlBackground = "titleAnimales.jpg";
      break;
    case idSection == 9 && idOption == 0 && idAlt == 1:
      urlBackground = "HelpAnimals1.jpg";
      break;
    case idSection == 9 && idOption == 0 && idAlt == 2:
      urlBackground = "HelpAnimals2.jpg";
      break;
    case idSection == 9 && idOption == 0 && idAlt == 3:
      urlBackground = "HelpAnimals3.jpg";
      break;
    case idSection == 9 && idOption == 0 && idAlt == 4:
      urlBackground = "HelpAnimals4.jpg";
      break;
    case idSection == 9 && idOption == 1 && idAlt == 1:
      urlBackground = "caddisflyCoveredAnimals1.jpg";
      break;
    case idSection == 9 && idOption == 1 && idAlt == 2:
      urlBackground = "caddisflyCoveredAnimals2.jpg";
      break;
    case idSection == 9 && idOption == 2 && idAlt == 1:
      urlBackground = "mayflyAnimals1.jpg";
      break;
    case idSection == 9 && idOption == 2 && idAlt == 2:
      urlBackground = "mayflyAnimals2.jpg";
      break;
    case idSection == 9 && idOption == 3 && idAlt == 1:
      urlBackground = "caddisflyUncoveredAnimals1.jpg";
      break;
    case idSection == 9 && idOption == 3 && idAlt == 2:
      urlBackground = "caddisflyUncoveredAnimals2.jpg";
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
  getImg
};
